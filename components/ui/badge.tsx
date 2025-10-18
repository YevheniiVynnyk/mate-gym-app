import React from "react";
import {Text, View, ViewProps} from "react-native";
import {styled} from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

export interface BadgeProps extends ViewProps {
	variant?: BadgeVariant;
	label: string;
	className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
	default: "bg-primary text-primary-foreground border-transparent",
	secondary: "bg-secondary text-secondary-foreground border-transparent",
	destructive: "bg-destructive text-destructive-foreground border-transparent",
	outline: "bg-blue-600 text-primary-foreground border-transparent",
};

export const Badge: React.FC<BadgeProps> = ({
												variant = "default",
												label,
												className = "",
												style,
												...props
											}) => {
	return (
		<StyledView
			className={`inline-flex items-center rounded-full border px-2.5 py-0.5 ${variantStyles[variant]} ${className}`}
			style={[{borderWidth: 0}, style]}
			{...props}
		>
			<StyledText className="text-xs font-semibold">{label}</StyledText>
		</StyledView>
	);
};
