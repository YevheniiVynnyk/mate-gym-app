import React from "react";
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
			<ClientDashboard
				onViewTrainingDays={handleViewTrainingDays}
				onViewCalendar={handleViewCalendar}
				onCreateTrainingDay={handleCreateTrainingDay}
			/>
	);
}
