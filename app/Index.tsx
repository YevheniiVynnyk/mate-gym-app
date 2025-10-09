import React from "react";
import WelcomeScreen from "@/components/auth/WelcomeScreen";
import Dashboard from "@/app/dashboard";
import {useAuth} from "@/contexts/AuthContext";


export default function Index() {
	const {user} = useAuth();

	if (user) {
		return <Dashboard/>;
	}

	return <WelcomeScreen/>;
}
