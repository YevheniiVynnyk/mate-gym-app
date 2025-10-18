import React, {useEffect, useState} from 'react';
import {
	ActivityIndicator,
	Alert,
	Dimensions,
	FlatList,
	Modal,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {BodyCreateDTO, BodyDTO, bodyService} from '@/services/bodyService';

interface EditableBody extends BodyDTO {
	isEditing?: boolean;
}

const BodyProgress: React.FC = () => {
	const [bodyData, setBodyData] = useState<EditableBody[]>([]);
	const [loading, setLoading] = useState(true);
	const [modalVisible, setModalVisible] = useState(false);
	const [modalId, setModalId] = useState<number | null>(null);
	const [date, setDate] = useState('');
	const [height, setHeight] = useState('');
	const [weight, setWeight] = useState('');
	const [tab, setTab] = useState<'weight' | 'bmi'>('weight');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await bodyService.getAllBodyRecords();
				setBodyData(data);
			} catch (e) {
				console.error('Ошибка загрузки данных', e);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const openModalForEdit = (record: EditableBody) => {
		setModalId(record.id);
		setDate(record.date.toISOString().slice(0, 10));
		setHeight(record.height.toString());
		setWeight(record.weight.toString());
		setModalVisible(true);
	};

	const handleSave = async () => {
		if (!date || !height || !weight) {
			Alert.alert('Ошибка', 'Заполни все поля');
			return;
		}

		const newRecord: BodyCreateDTO = {
			date: new Date(date),
			height: parseFloat(height),
			weight: parseFloat(weight),
		};
		const bmi = parseFloat(weight) / Math.pow(parseFloat(height) / 100, 2);

		try {
			if (modalId) {
				await bodyService.updateBodyRecord({id: modalId, ...newRecord, bmi});
				setBodyData(prev =>
					prev.map(r => (r.id === modalId ? {...r, ...newRecord, bmi} : r))
				);
			} else {
				await bodyService.createBodyRecord(newRecord);
				const updatedData = await bodyService.getAllBodyRecords();
				setBodyData(updatedData);
			}
		} catch (e) {
			console.error('Ошибка при сохранении записи', e);
		} finally {
			setModalVisible(false);
			setModalId(null);
			setDate('');
			setHeight('');
			setWeight('');
		}
	};

	const handleDelete = async (id: number) => {
		try {
			await bodyService.deleteBodyRecord(id);
			setBodyData(prev => prev.filter(r => r.id !== id));
		} catch (e) {
			console.error('Ошибка при удалении записи', e);
		}
	};

	if (loading) {
		return (
			<View style={styles.center}>
				<ActivityIndicator size="large" color="#007AFF"/>
			</View>
		);
	}

	if (!bodyData.length) {
		return (
			<View style={styles.center}>
				<Text style={styles.emptyText}>Нет данных по весу и ИМТ</Text>
				<TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
					<Text style={styles.addButtonText}>+ Новая запись</Text>
				</TouchableOpacity>
			</View>
		);
	}

	const screenWidth = Dimensions.get('window').width - 20;
	const labels = bodyData.map(r => r.date.toLocaleDateString());
	const weightData = bodyData.map(r => r.weight);
	const bmiData = bodyData.map(r => r.bmi);

	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<Text style={styles.title}>Мониторинг веса и ИМТ</Text>
				<TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
					<Text style={styles.addButtonText}>+ Новая запись</Text>
				</TouchableOpacity>
			</View>

			{/* Tabs */}
			<View style={styles.tabContainer}>
				<TouchableOpacity
					style={[styles.tabButton, tab === 'weight' && styles.tabButtonActive]}
					onPress={() => setTab('weight')}>
					<Text style={tab === 'weight' ? styles.tabTextActive : styles.tabText}>Вес</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.tabButton, tab === 'bmi' && styles.tabButtonActive]}
					onPress={() => setTab('bmi')}>
					<Text style={tab === 'bmi' ? styles.tabTextActive : styles.tabText}>ИМТ</Text>
				</TouchableOpacity>
			</View>

			{/* Chart */}
			<LineChart
				data={{
					labels,
					datasets: [{data: tab === 'weight' ? weightData : bmiData}],
				}}
				width={screenWidth}
				height={220}
				yAxisSuffix={tab === 'weight' ? ' кг' : ''}
				yAxisInterval={1}
				chartConfig={{
					backgroundColor: '#ffffff',
					backgroundGradientFrom: '#ffffff',
					backgroundGradientTo: '#ffffff',
					decimalPlaces: 1,
					color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
					labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
				}}
				bezier
				style={styles.chart}
			/>

			{/* Table */}
			<FlatList
				data={bodyData}
				keyExtractor={item => item.id.toString()}
				renderItem={({item}) => (
					<View style={styles.row}>
						<Text style={styles.cell}>{item.date.toLocaleDateString()}</Text>
						<Text style={styles.cell}>{item.height} см</Text>
						<Text style={styles.cell}>{item.weight} кг</Text>
						<Text style={styles.cell}>{item.bmi.toFixed(1)}</Text>
						<View style={styles.actionCell}>
							<TouchableOpacity
								style={styles.editButton}
								onPress={() => openModalForEdit(item)}>
								<Text style={styles.actionText}>Ред.</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.deleteButton}
								onPress={() => handleDelete(item.id)}>
								<Text style={styles.actionText}>Удал.</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
			/>

			{/* Modal */}
			<Modal
				visible={modalVisible}
				animationType="slide"
				transparent={true}
				onRequestClose={() => setModalVisible(false)}>
				<View style={styles.modalBackdrop}>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>
							{modalId ? 'Редактировать запись' : 'Добавить запись'}
						</Text>

						<TextInput
							style={styles.input}
							placeholder="Дата (YYYY-MM-DD)"
							value={date}
							onChangeText={setDate}
						/>
						<TextInput
							style={styles.input}
							placeholder="Рост (см)"
							keyboardType="numeric"
							value={height}
							onChangeText={setHeight}
						/>
						<TextInput
							style={styles.input}
							placeholder="Вес (кг)"
							keyboardType="numeric"
							value={weight}
							onChangeText={setWeight}
						/>

						<View style={styles.modalButtons}>
							<TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
								<Text style={styles.cancelText}>Отмена</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.saveButton} onPress={handleSave}>
								<Text style={styles.saveText}>Сохранить</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
};

export default BodyProgress;

const styles = StyleSheet.create({
	container: {flex: 1, padding: 10, backgroundColor: '#fff'},
	center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
	emptyText: {color: '#777', fontSize: 16, marginBottom: 20},
	header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10},
	title: {fontSize: 18, fontWeight: '600', color: '#111'},
	addButton: {backgroundColor: '#007AFF', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6},
	addButtonText: {color: '#fff', fontWeight: 'bold'},
	tabContainer: {flexDirection: 'row', marginVertical: 10},
	tabButton: {flex: 1, padding: 10, alignItems: 'center', borderBottomWidth: 2, borderColor: '#ccc'},
	tabButtonActive: {borderColor: '#007AFF'},
	tabText: {color: '#777'},
	tabTextActive: {color: '#007AFF', fontWeight: '600'},
	chart: {marginVertical: 8, borderRadius: 8},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderColor: '#eee'
	},
	cell: {flex: 1, textAlign: 'center', fontSize: 13},
	actionCell: {flexDirection: 'row', gap: 6},
	editButton: {backgroundColor: '#E8F0FE', paddingHorizontal: 6, paddingVertical: 4, borderRadius: 4},
	deleteButton: {backgroundColor: '#FDECEC', paddingHorizontal: 6, paddingVertical: 4, borderRadius: 4},
	actionText: {fontSize: 12, color: '#007AFF'},
	modalBackdrop: {flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)'},
	modalContent: {backgroundColor: '#fff', padding: 20, borderRadius: 8, width: '90%'},
	modalTitle: {fontSize: 18, fontWeight: '600', marginBottom: 12},
	input: {borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, marginBottom: 10},
	modalButtons: {flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10},
	cancelButton: {marginRight: 10},
	cancelText: {color: '#555'},
	saveButton: {backgroundColor: '#007AFF', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6},
	saveText: {color: '#fff', fontWeight: 'bold'},
});
