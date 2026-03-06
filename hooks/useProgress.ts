import { useEffect, useState } from "react";
import { ProgressPageData } from "@/types/progress";
import { mockProgressService } from "@/services/mockProgressService";

export const useProgress = () => {
  const [data, setData] = useState<ProgressPageData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const progressData = await mockProgressService.getProgressData();
      setData(progressData);
    } catch (e) {
      console.error("Ошибка загрузки данных прогресса", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    refresh: fetchData,
  };
};
