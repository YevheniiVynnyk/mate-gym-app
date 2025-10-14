import React from "react";
import Welcome from "@/app/welcome";
import Dashboard from "@/app/dashboard";
import {useAuth} from "@/contexts/AuthContext";


export default function App() {
	const {user} = useAuth();

	if (user) {
		return <Dashboard/>;
	}

	return <Welcome/>;
}
