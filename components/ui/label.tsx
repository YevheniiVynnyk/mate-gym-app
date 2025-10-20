import React from "react";
import {Text, TextProps} from "react-native";
import {styled} from "nativewind";

const StyledText = styled(Text);

const Label = React.forwardRef<Text, TextProps>(
	({className, children, style, ...props}, ref) => {
		return (
			<StyledText
				ref={ref}
				className={`text-sm font-medium leading-none opacity-70 ${className}`}
				style={style}
				{...props}
			>
				{children}
			</StyledText>
		);
	}
);

Label.displayName = "Label";

export {Label};
