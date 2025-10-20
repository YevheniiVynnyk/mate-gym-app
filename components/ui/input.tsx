import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { styled } from "nativewind";

const StyledTextInput = styled(TextInput);

const Input = React.forwardRef<TextInput, TextInputProps>(
  ({ className, style, ...props }, ref) => {
    return (
      <StyledTextInput
        ref={ref}
        className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base placeholder:text-gray-400 disabled:opacity-50 ${className}`}
        style={style}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
