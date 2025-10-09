import React from "react";
import {View} from "react-native";
import {useRouter} from "expo-router";
import ClientDashboard from "@/components/dashboard/ClientDashboard";

export default function Dashboard() {
	const router = useRouter();
	const handleViewTrainingDays = () => {
		router.push("/trainingDays");
	};

	const handleViewCalendar = () => {
		router.push("/trainingDays?tab=calendar");
	};

	const handleCreateTrainingDay = () => {
		router.push("/trainingDay/create");
	};

	return (
		<View style={{flex: 1, backgroundColor: "#f0f4f8"}}>
			<ClientDashboard
				onViewTrainingDays={handleViewTrainingDays}
				onViewCalendar={handleViewCalendar}
				onCreateTrainingDay={handleCreateTrainingDay}
			/>
		</View>
	);
}
