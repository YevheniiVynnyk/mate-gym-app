import { useEffect, useState } from "react";
import { QuickStatDTO, statisticsService } from "@/services/statisticsService";
import { TrainingDay } from "@/types/trainingDay";
import { trainingDayService } from "@/services/trainingDayService";
import { ChartDataDTO, chartService } from "@/services/bodyService";

export function useDashboardData() {
  const [trainingDays, setTrainingDays] = useState<TrainingDay[]>([]);
  const [quickStats, setQuickStats] = useState<QuickStatDTO | undefined>(
    undefined,
  );
  const [bmiData, setBmiData] = useState<ChartDataDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const latest = await trainingDayService.getLatestThree();
        setTrainingDays(latest);

        const stats = await statisticsService.getQuickStatistics();
        setQuickStats(stats);

        const bmi = await chartService.getBMIChart();
        setBmiData(bmi);
      } catch (e) {
        console.error("Ошибка загрузки данных", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { trainingDays, quickStats, bmiData, loading };
}
