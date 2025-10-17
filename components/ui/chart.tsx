import React, { createContext, useContext } from 'react';
import { View, ViewProps, Text } from 'react-native';
import { styled } from 'nativewind';
import { VictoryChart, VictoryTooltip, VictoryLegend, VictoryLine } from 'victory-native';

const StyledView = styled(View);

type ChartConfigItem = {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    color?: string;
};

export type ChartConfig = Record<string, ChartConfigItem>;

type ChartContextProps = {
    config: ChartConfig;
};

const ChartContext = createContext<ChartContextProps | null>(null);

function useChart() {
    const context = useContext(ChartContext);
    if (!context) {
        throw new Error('useChart must be used within a <ChartContainer />');
    }
    return context;
}

export const ChartContainer: React.FC<
    ViewProps & { config: ChartConfig; children: React.ReactNode }
> = ({ className, config, children, ...props }) => {
    return (
        <ChartContext.Provider value={{ config }}>
            <StyledView className={`flex justify-center p-4 ${className || ''}`} {...props}>
                <VictoryChart>{children}</VictoryChart>
            </StyledView>
        </ChartContext.Provider>
    );
};

ChartContainer.displayName = 'ChartContainer';

export const ChartTooltip: React.FC<any> = ({ datum }) => {
    const { config } = useChart();
    const configItem = config[datum?.name || ''] || {};
    return (
        <VictoryTooltip
            flyoutStyle={{ fill: configItem.color || '#fff' }}
            text={`${configItem.label || datum?.y}`}
        />
    );
};

export const ChartLegend: React.FC<{
    data: { name: string; symbol: { fill: string } }[];
}> = ({ data }) => {
    return (
        <VictoryLegend
            orientation="horizontal"
            gutter={20}
            data={data}
            style={{
                labels: { fontSize: 12 },
            }}
        />
    );
};
