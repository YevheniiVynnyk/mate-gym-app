import { useEffect, useState } from "react";
import { ProgressPageData } from "@/types/progress";
import { progressService } from "@/services/progressService";
import { BodyDTO, bodyService, chartService } from "@/services/bodyService";
import { logError, logWarn } from "@/utils/logger";

export const useProgress = () => {
  const [data, setData] = useState<ProgressPageData | null>(null);
  const [bodyData, setBodyData] = useState<BodyDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [
        summaryResult,
        weightHistoryResult,
        bmiHistoryResult,
        bodyDataResult,
      ] = await Promise.allSettled([
        progressService.getSummary(),
        chartService.getWeightChart(),
        chartService.getBMIChart(),
        bodyService.getAll(),
      ]);

      const summary =
        summaryResult.status === "fulfilled" ? summaryResult.value : null;
      const weightHistory =
        weightHistoryResult.status === "fulfilled"
          ? weightHistoryResult.value
          : [];
      const bmiHistory =
        bmiHistoryResult.status === "fulfilled" ? bmiHistoryResult.value : [];
      const bodyRecords =
        bodyDataResult.status === "fulfilled" ? bodyDataResult.value : [];

      if (!summary) {
        logWarn(
          "Failed to fetch real progress data. Using mock data as a fallback.",
          "useProgress",
        );
        return;
      }

      setBodyData(bodyRecords);

      if (weightHistoryResult.status === "rejected")
        logError(weightHistoryResult.reason, "useProgress/weight");
      if (bmiHistoryResult.status === "rejected")
        logError(bmiHistoryResult.reason, "useProgress/bmi");
      setData({
        summary: summary,
        weightHistory,
        bmiHistory,
      });
    } catch (e) {
      logError(e, "useProgress/fetchData");
      logWarn(
        "An unexpected error occurred. Using mock data as a fallback.",
        "useProgress",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    bodyData,
    loading,
    refresh: fetchData,
  };
};
