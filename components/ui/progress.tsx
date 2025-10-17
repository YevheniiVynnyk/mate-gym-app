import React from 'react';
import { View } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);

interface ProgressProps {
    value?: number; // от 0 до 100
    className?: string;
}

export const Progress: React.FC<ProgressProps> = ({ value = 0, className }) => {
    const clampedValue = Math.max(0, Math.min(value, 100));

    return (
        <StyledView className={className ?? 'w-full h-4 bg-gray-300 rounded-full overflow-hidden'}>
            <StyledView
                className="h-full bg-blue-500"
                style={{
                    width: `${clampedValue}%`,
                    transitionProperty: 'width',
                    transitionDuration: '300ms',
                }}
            />
        </StyledView>
    );
};
