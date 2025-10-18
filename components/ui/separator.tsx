import React from "react";
import {View} from "react-native";
import {styled} from "nativewind";

const StyledView = styled(View);

interface SeparatorProps {
	orientation?: "horizontal" | "vertical";
	className?: string;
}

export const Separator: React.FC<SeparatorProps> = ({
														orientation = "horizontal",
														className,
													}) => {
	return (
		<StyledView
			className={
				className ??
				(orientation === "horizontal"
					? "h-px w-full bg-gray-300"
					: "w-px h-full bg-gray-300")
			}
		/>
	);
};
