import React from "react";
import {View} from "react-native";
import Navbar from "./Navbar";
import BottomNavigation from "./BottomNavigation";

type Props = {
	children: React.ReactNode;
};

const AppLayout: React.FC<Props> = ({children}) => {
	return (
		<View className="bg-background">
			<Navbar/>
			<View className="pb-20">{children}</View>
			<BottomNavigation/>
		</View>
	);
};

export default AppLayout;
