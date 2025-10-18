import React from "react";
import { View, Text, ViewProps, TextProps } from "react-native";

const Card = React.forwardRef<View, ViewProps>((props, ref) => {
	const { className, ...rest } = props;
	return (
		<View
			ref={ref}
			className={`rounded-lg border-none bg-card text-card-foreground shadow-lx ${className || ""}`}
			{...rest}
		/>
	);
});
Card.displayName = "Card";

const CardHeader = React.forwardRef<View, ViewProps>((props, ref) => {
	const { className, ...rest } = props;
	return (
		<View
			ref={ref}
			className={`flex flex-col space-y-1.5 p-4 ${className || ""}`}
			{...rest}
		/>
	);
});
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<Text, TextProps>((props, ref) => {
	const { className, ...rest } = props;
	return (
		<Text
			ref={ref}
			className={`text-2xl font-semibold leading-none tracking-tight ${className || ""}`}
			{...rest}
		/>
	);
});
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<Text, TextProps>((props, ref) => {
	const { className, ...rest } = props;
	return (
		<Text
			ref={ref}
			className={`text-sm text-muted-foreground ${className || ""}`}
			{...rest}
		/>
	);
});
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<View, ViewProps>((props, ref) => {
	const { className, ...rest } = props;
	return (
		<View ref={ref} className={`p-4 pt-0 ${className || ""}`} {...rest} />
	);
});
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<View, ViewProps>((props, ref) => {
	const { className, ...rest } = props;
	return (
		<View
			ref={ref}
			className={`flex flex-row items-center p-6 pt-0 ${className || ""}`}
			{...rest}
		/>
	);
});
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
