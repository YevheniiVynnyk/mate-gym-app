import * as React from "react";
import { TextInput, TextInputProps } from "react-native";
import { cn } from "@/lib/utils";

export interface TextareaProps extends TextInputProps {}

const Textarea = React.forwardRef<TextInput, TextareaProps>(
	({ className, style, ...props }, ref) => {
		return (
			<TextInput
				ref={ref}
				multiline
				textAlignVertical="top"
				className={cn(
					"flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50",
					className
				)}
				style={style}
				{...props}
			/>
		);
	}
);

Textarea.displayName = "Textarea";

export { Textarea };
