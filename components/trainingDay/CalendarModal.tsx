import React from "react";
import {Modal, Text, TouchableOpacity} from "react-native";
import {Calendar} from "react-native-calendars";

export const CalendarModal = ({visible, onClose, onSelect, selectedDate}: any) => (
	<Modal visible={visible} animationType="slide">
		<Calendar
			onDayPress={(day) => {
				const date = new Date(day.dateString);
				const now = new Date();
				date.setHours(now.getHours(), now.getMinutes(), 0, 0);
				onSelect(date);
				onClose();
			}}
			markedDates={{
				[selectedDate.toISOString().split("T")[0]]: {selected: true},
			}}
		/>
		<TouchableOpacity onPress={onClose}>
			<Text className="text-center text-red-500 mt-5">Закрыть</Text>
		</TouchableOpacity>
	</Modal>
);
