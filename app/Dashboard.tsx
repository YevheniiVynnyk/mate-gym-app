import React from "react";
import {useRouter} from "expo-router";
import ClientDashboard from "@/components/dashboard/ClientDashboard";

export default function Dashboard() {
	const router = useRouter();
	const handleViewTrainingDays = () => {
		router.push("/trainingDay/trainingDayView");
	};

	const handleCreateTrainingDay = () => {
		router.push("/trainingDay/trainingDayForm");
	};

	return (
			<ClientDashboard
				onViewTrainingDays={handleViewTrainingDays}
				onCreateTrainingDay={handleCreateTrainingDay}
			/>
	);
}
