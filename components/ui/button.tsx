import React from "react";
import {Text, TextStyle, TouchableOpacity, ViewStyle} from "react-native";
import {styled} from "nativewind";

const StyledTouchable = styled(TouchableOpacity);
const StyledText = styled(Text);

type ButtonVariant =
	| "default"
	| "destructive"
	| "outline"
	| "secondary"
	| "ghost"
	| "link";

type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps {
	variant?: ButtonVariant;
	size?: ButtonSize;
	asChild?: boolean; // можно убрать для RN
	className?: string;
	children: React.ReactNode;
	style?: ViewStyle | TextStyle;
	onPress?: () => void;
	disabled?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
	default: "bg-primary text-primary-foreground",
	destructive: "bg-destructive text-destructive-foreground",
	outline:
		"border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
	secondary: "bg-secondary text-secondary-foreground",
	ghost: "bg-transparent text-foreground",
	link: "bg-transparent text-primary underline",
};

const sizeStyles: Record<ButtonSize, string> = {
	default: "h-10 px-4 py-2 rounded-md",
	sm: "h-9 px-3 rounded-md",
	lg: "h-11 px-8 rounded-md",
	icon: "h-10 w-10 rounded-full",
};

export const Button: React.FC<ButtonProps> = ({
												  variant = "default",
												  size = "default",
												  className = "",
												  children,
												  style,
												  disabled,
												  onPress,
											  }) => {
	return (
		<StyledTouchable
			className={`inline-flex items-center justify-center gap-2 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
			style={style}
			disabled={disabled}
			onPress={onPress}
		>
			<StyledText className="text-sm font-medium">{children}</StyledText>
		</StyledTouchable>
	);
};
