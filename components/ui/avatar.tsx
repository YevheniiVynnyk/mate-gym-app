import React from "react";
import {Image, ImageProps, Text, TextProps, View, ViewProps} from "react-native";
import {styled} from "nativewind";

const StyledView = styled(View);
const StyledImage = styled(Image);
const StyledText = styled(Text);

type AvatarProps = ViewProps & {
	size?: number;
};

const Avatar = React.forwardRef<View, AvatarProps>(({size = 40, className, style, ...props}, ref) => {
	return (
		<StyledView
			ref={ref}
			className={`relative flex items-center justify-center overflow-hidden rounded-full ${className}`}
			style={[{width: size, height: size, borderRadius: size / 2}, style]}
			{...props}
		/>
	);
});
Avatar.displayName = "Avatar";

type AvatarImageProps = ImageProps & {
	className?: string;
};

const AvatarImage = React.forwardRef<Image, AvatarImageProps>(({className, style, ...props}, ref) => {
	return (
		<StyledImage
			ref={ref}
			className={`h-full w-full aspect-square ${className}`}
			style={[{resizeMode: "cover"}, style]}
			{...props}
		/>
	);
});
AvatarImage.displayName = "AvatarImage";

type AvatarFallbackProps = TextProps & {
	label?: string;
	className?: string;
};

const AvatarFallback = React.forwardRef<Text, AvatarFallbackProps>(
	({label = "?", className, style, ...props}, ref) => {
		return (
			<StyledView
				className={`flex items-center justify-center rounded-full bg-gray-300 ${className}`}
				style={style}
			>
				<StyledText
					ref={ref}
					className="text-white font-bold"
					{...props}
				>
					{label}
				</StyledText>
			</StyledView>
		);
	}
);
AvatarFallback.displayName = "AvatarFallback";

export {Avatar, AvatarImage, AvatarFallback};
