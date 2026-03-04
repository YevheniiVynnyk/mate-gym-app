import { useEffect, useState } from "react";
import { QuickStatDTO, statisticsService } from "@/services/statisticsService";
import { TrainingDay } from "@/types/trainingDay";
import { trainingDayService } from "@/services/trainingDayService";

export function useDashboardData() {
  const [trainingDays, setTrainingDays] = useState<TrainingDay[]>([]);
  const [quickStats, setQuickStats] = useState<QuickStatDTO | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const latest = await trainingDayService.getLatestThree();
        setTrainingDays(latest);

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

  return { trainingDays, quickStats, loading };
}
