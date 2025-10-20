import {useEffect, useState} from "react";
import {trainingDayService} from "@/services/trainingDayService";
import {QuickStatDTO, statisticsService} from "@/services/statisticsService";
import {mapFromAPI} from "@/services/mapper/trainingDayMapper";
import {TrainingDay} from "@/types/trainingDay";

export function useDashboardData() {
	const [trainingDays, setTrainingDays] = useState<TrainingDay[]>([]);
	const [quickStats, setQuickStats] = useState<QuickStatDTO | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const latest = await trainingDayService.getLatestThree();
				setTrainingDays(latest.map(mapFromAPI));

				const stats = await statisticsService.getQuickStatistics();
				setQuickStats(stats);
			} catch (e) {
				console.error("Ошибка загрузки данных", e);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return {trainingDays, quickStats, loading};
}