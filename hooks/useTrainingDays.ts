import { useEffect, useState } from 'react';
import { trainingDayService } from '@/services/trainingDayService';
import { mapFromAPI } from '@/services/mapper/trainingDayMapper';
import { useTrainingDays } from '@/contexts/TrainingDaysContext';

export const useTrainingDaysData = () => {
    const { trainingDays, setTrainingDays } = useTrainingDays();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadTrainingDays = async () => {
            try {
                setIsLoading(true);
                const apiData = await trainingDayService.getAllTrainingDays();
                setTrainingDays(apiData.map(mapFromAPI));
            } catch (err) {
                console.error('Ошибка загрузки тренировок:', err);
                setTrainingDays([]);
            } finally {
                setIsLoading(false);
            }
        };
        loadTrainingDays();
    }, []);

    return { trainingDays, isLoading };
};
