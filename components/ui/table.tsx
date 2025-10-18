import React from "react";
import {ScrollView, Text, View} from "react-native";
import {styled} from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

interface TableProps {
	className?: string;
	children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({className, children}) => {
	return (
		<ScrollView
			horizontal
			className={className ?? "w-full"}
			contentContainerStyle={{flexGrow: 1}}
		>
			<StyledView className="w-full">{children}</StyledView>
		</ScrollView>
	);
};

interface TableSectionProps {
	className?: string;
	children: React.ReactNode;
}

export const TableHeader: React.FC<TableSectionProps> = ({
															 className,
															 children,
														 }) => (
	<StyledView className={className ?? "border-b border-gray-300"}>
		{children}
	</StyledView>
);

export const TableBody: React.FC<TableSectionProps> = ({
														   className,
														   children,
													   }) => (
	<StyledView className={className ?? ""}>{children}</StyledView>
);

export const TableFooter: React.FC<TableSectionProps> = ({
															 className,
															 children,
														 }) => (
	<StyledView className={className ?? "border-t border-gray-300"}>
		{children}
	</StyledView>
);

interface TableRowProps {
	className?: string;
	children: React.ReactNode;
}

export const TableRow: React.FC<TableRowProps> = ({className, children}) => (
	<StyledView className={className ?? "flex-row border-b border-gray-200"}>
		{children}
	</StyledView>
);

interface TableCellProps {
	className?: string;
	children: React.ReactNode;
	flex?: number;
}

export const TableCell: React.FC<TableCellProps> = ({
														className,
														children,
														flex = 1,
													}) => (
	<StyledView className={className ?? "p-4"} style={{flex}}>
		<StyledText>{children}</StyledText>
	</StyledView>
);

export const TableCaption: React.FC<{ className?: string; children: React.ReactNode }> =
	({className, children}) => (
		<StyledText className={className ?? "text-sm text-gray-500 p-2"}>
			{children}
		</StyledText>
	);
