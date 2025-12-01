import React from "react";
import Welcome from "@/app/welcome";
import Dashboard from "@/app/Dashboard";
import {useAuth} from "@/contexts/AuthContext";


export default function Index() {
	const {user} = useAuth();

	if (user) {
		return <Dashboard/>;
	}

	return <Welcome/>;
}
