import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { Award, Clock, Target, TrendingUp } from 'lucide-react-native';
import {
    analyticsService,
    ExerciseProgress,
    FavoriteExercise,
    MonthlyProgress,
    WeeklyActivity,
} from '@/services/analyticsService';
import { QuickStatDTO, statisticsService } from '@/services/statisticsService';
import { formatDuration } from '@/lib/utils';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const Analytics = () => {
    const [quickStats, setQuickStats] = useState<QuickStatDTO | null>(null);
    const [monthlyProgress, setMonthlyProgress] = useState<MonthlyProgress[]>([]);
    const [exerciseProgress, setExerciseProgress] = useState<ExerciseProgress[]>([]);
    const [weeklyActivity, setWeeklyActivity] = useState<WeeklyActivity[]>([]);
    const [favoriteExercises, setFavoriteExercises] = useState<FavoriteExercise[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            setLoading(true);
            setError(null);
            try {
                const [quickStats, monthly, exercises, weekly, favorites] = await Promise.all([
                    statisticsService.getQuickStatistics(),
                    analyticsService.getMonthlyProgress(),
                    analyticsService.getExerciseProgress(),
                    analyticsService.getWeeklyActivity(),
                    analyticsService.getFavoriteExercises(),
                ]);
                setQuickStats(quickStats);
                setMonthlyProgress(monthly);
                setExerciseProgress(exercises);
                setWeeklyActivity(weekly);
                setFavoriteExercises(favorites);
            } catch (err) {
                setError('Не удалось загрузить аналитику. Попробуйте позже.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.loader}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    if (!quickStats) return null;

    return (
        <ScrollView style={styles.container}>
            {/* Quick Stats */}
            <View style={styles.statsContainer}>
                <StatCard
                    title="Всего тренировок"
                    icon={<Target size={20} />}
                    value={quickStats.totalTrainings.toString()}
                />
                <StatCard
                    title="Завершено"
                    icon={<TrendingUp size={20} />}
                    value={quickStats.completedTrainings.toString()}
                    subValue={
                        quickStats.totalTrainings
                            ? `${((quickStats.completedTrainings / quickStats.totalTrainings) * 100).toFixed(0)}% от общего числа`
                            : '0%'
                    }
                />
                <StatCard
                    title="Общее время"
                    icon={<Clock size={20} />}
                    value={formatDuration(quickStats.totalTimeMinutes)}
                    subValue={`В среднем ${formatDuration(quickStats.averageDurationMinutes)} за тренировку`}
                />
            </View>

            {/* Monthly Progress Chart */}
            <View style={styles.chartCard}>
                <Text style={styles.cardTitle}>Динамика тренировок</Text>
                <LineChart
                    data={{
                        labels: monthlyProgress.map((m) => m.month),
                        datasets: [{ data: monthlyProgress.map((m) => m.TrainingDays) }],
                    }}
                    width={screenWidth - 32}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#fff',
                        backgroundGradientFrom: '#fff',
                        backgroundGradientTo: '#fff',
                        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
                        labelColor: () => '#666',
                        decimalPlaces: 0,
                        style: { borderRadius: 8 },
                    }}
                    bezier
                    style={{ borderRadius: 8 }}
                />
            </View>

            {/* Exercise Progress */}
            <Card title="Прогресс в упражнениях" icon={<Award size={20} />}>
                {exerciseProgress.map((exercise) => (
                    <View key={exercise.name} style={styles.exerciseCard}>
                        <View style={styles.exerciseHeader}>
                            <Text style={styles.exerciseName}>{exercise.name}</Text>
                            <Text style={styles.exerciseValue}>
                                {exercise.current} {exercise.unit}
                            </Text>
                        </View>
                        <Text style={styles.exerciseSub}>
                            Старт: {exercise.start} {exercise.unit} • Цель: {exercise.goal}{' '}
                            {exercise.unit}
                        </Text>
                        <ProgressBar
                            value={
                                ((exercise.current - exercise.start) /
                                    (exercise.goal - exercise.start)) *
                                100
                            }
                        />
                    </View>
                ))}
            </Card>

            {/* Weekly Activity */}
            <Card title="Недельная активность">
                {weeklyActivity.map((day) => (
                    <View key={day.day} style={styles.weekItem}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View
                                style={[
                                    styles.dot,
                                    { backgroundColor: day.completed ? '#007bff' : '#ccc' },
                                ]}
                            />
                            <Text>{day.day}</Text>
                        </View>
                        <Text style={styles.weekValue}>
                            {day.completed ? `${day.duration}м` : 'Отдых'}
                        </Text>
                    </View>
                ))}
            </Card>

            {/* Favorite Exercises */}
            <Card title="Любимые упражнения">
                {favoriteExercises.map((exercise) => (
                    <View key={exercise.name} style={styles.exerciseCard}>
                        <View style={styles.exerciseHeader}>
                            <Text>{exercise.name}</Text>
                            <Text style={styles.exerciseValue}>{exercise.frequency} раз</Text>
                        </View>
                        <ProgressBar value={exercise.percentage} />
                    </View>
                ))}
            </Card>
        </ScrollView>
    );
};

const StatCard = ({ title, icon, value, subValue }: any) => (
    <View style={styles.statCard}>
        <View style={styles.statHeader}>
            <Text style={styles.statTitle}>{title}</Text>
            {icon}
        </View>
        <Text style={styles.statValue}>{value}</Text>
        {subValue && <Text style={styles.statSub}>{subValue}</Text>}
    </View>
);

const Card = ({ title, icon, children }: any) => (
    <View style={styles.card}>
        {title && (
            <View style={styles.cardHeader}>
                {icon}
                <Text style={styles.cardTitle}>{title}</Text>
            </View>
        )}
        <View style={styles.cardContent}>{children}</View>
    </View>
);

const ProgressBar = ({ value }: { value: number }) => (
    <View style={styles.progressBarBackground}>
        <View
            style={[styles.progressBarFill, { width: `${Math.min(Math.max(value, 0), 100)}%` }]}
        />
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    errorText: { color: 'red' },
    statsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    statCard: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        width: '48%',
        marginBottom: 12,
        elevation: 2,
    },
    statHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    statTitle: { fontSize: 14, fontWeight: 'bold' },
    statValue: { fontSize: 22, fontWeight: 'bold' },
    statSub: { fontSize: 12, color: '#666' },
    chartCard: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 12 },
    card: { backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 12 },
    cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    cardTitle: { fontSize: 16, fontWeight: 'bold', marginLeft: 6 },
    cardContent: {},
    exerciseCard: { marginBottom: 12 },
    exerciseHeader: { flexDirection: 'row', justifyContent: 'space-between' },
    exerciseName: { fontWeight: 'bold' },
    exerciseValue: { fontWeight: 'bold' },
    exerciseSub: { fontSize: 12, color: '#666' },
    progressBarBackground: {
        height: 8,
        backgroundColor: '#eee',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: { height: '100%', backgroundColor: '#007bff' },
    weekItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
    dot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
    weekValue: { fontWeight: 'bold' },
});

export default Analytics;
