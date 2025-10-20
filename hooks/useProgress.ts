import {useEffect, useState} from "react";
import {QuickStatDTO, statisticsService, WeeklyActivityDTO} from "@/services/statisticsService";
import {BodyDTO, bodyService} from "@/services/bodyService";

export const useProgress = () => {
	const [quickStats, setQuickStats] = useState<QuickStatDTO | null>(null);
	const [weeklyStats, setWeeklyStats] = useState<WeeklyActivityDTO[] | null>(null);
	const [bodyData, setBodyData] = useState<BodyDTO[] | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const quickStats = await statisticsService.getQuickStatistics().catch(() => null);
				const weeklyStats = await statisticsService.getWeeklyStats().catch(() => []);
				const bodyData = await bodyService.getAllBodyRecords().catch(() => []);
				setQuickStats(quickStats);
				setWeeklyStats(weeklyStats);
				setBodyData(bodyData);
			} catch (e) {
				console.error("Ошибка загрузки данных", e);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const totalDays = weeklyStats?.length ?? 0;
	const completedDays = weeklyStats?.filter((s) => s.completed).length ?? 0;
	const weekProgress = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;

	const noData =
		!quickStats &&
		(!weeklyStats || weeklyStats.length === 0) &&
		(!bodyData || bodyData.length === 0);

	return {
		quickStats,
		weeklyStats,
		bodyData,
		loading,
		noData,
		totalDays,
		completedDays,
		weekProgress,
	};
};