import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { trainingDayService } from '@/services/trainingDayService';
import { mapFromAPI } from '@/services/mapper/trainingDayMapper';

export const useTrainingDay = (id: number, userId?: number) => {
    const [trainingDay, setTrainingDay] = useState<any>(null);
    const [isStarted, setIsStarted] = useState(false);
    const [time, setTime] = useState(0);

    useEffect(() => {
        if (!id) return;
        const load = async () => {
            try {
                const apiTrainingDay = await trainingDayService.getTrainingDayById(id);
                setTrainingDay(mapFromAPI(apiTrainingDay));
            } catch {
                Alert.alert('Ошибка', 'Не удалось загрузить тренировку');
            }
        };
        load();
    }, [id]);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isStarted) {
            interval = setInterval(() => setTime((t) => t + 1), 1000);
        }
        return () => interval && clearInterval(interval);
    }, [isStarted]);

    const start = async () => {
        if (!trainingDay) return;
        setIsStarted(true);
        setTime(0);
        const now = new Date();
        const updated = {
            ...trainingDay,
            status: 'IN_PROGRESS',
            startTime: now,
            modifiedDate: now,
            modifiedBy: userId ?? 0,
        };
        await trainingDayService.updateTrainingDay(updated);
        setTrainingDay(updated);
        Alert.alert('Тренировка начата', 'Удачной тренировки!');
    };

    const finish = async () => {
        if (!trainingDay) return;
        setIsStarted(false);
        const now = new Date();
        const updated = {
            ...trainingDay,
            status: 'COMPLETED',
            endTime: now,
            modifiedDate: now,
            modifiedBy: userId ?? 0,
        };
        await trainingDayService.updateTrainingDay(updated);
        setTrainingDay(updated);
        Alert.alert('Тренировка завершена', `Время: ${formatTime(time)}`);
    };

    const remove = async () => {
        await trainingDayService.deleteTrainingDay(id);
        Alert.alert('Удалено', 'Тренировка успешно удалена');
    };

    return { trainingDay, isStarted, time, start, finish, remove, setTrainingDay };
};

export const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return h > 0
        ? `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
        : `${m}:${s.toString().padStart(2, '0')}`;
};
