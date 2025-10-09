import React from "react";
import { Calendar as RNCalendar, CalendarProps as RNCalendarProps, DateObject } from "react-native-calendars";
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);

export interface CalendarProps extends RNCalendarProps {}

export const Calendar: React.FC<CalendarProps> = ({ ...props }) => {
	return (
		<StyledView className="p-4">
			<RNCalendar
				theme={{
					backgroundColor: "#fff",
					calendarBackground: "#f9fafb",
					textSectionTitleColor: "#6b7280",
					selectedDayBackgroundColor: "#2563eb",
					selectedDayTextColor: "#ffffff",
					todayTextColor: "#2563eb",
					dayTextColor: "#111827",
					textDisabledColor: "#9ca3af",
					dotColor: "#2563eb",
					selectedDotColor: "#ffffff",
					arrowColor: "#2563eb",
					monthTextColor: "#111827",
					textDayFontSize: 16,
					textMonthFontSize: 18,
					textDayHeaderFontSize: 14,
				}}
				renderArrow={(direction) =>
					direction === "left" ? (
						<ChevronLeft size={20} color="#2563eb" />
					) : (
						<ChevronRight size={20} color="#2563eb" />
					)
				}
				{...props}
			/>
		</StyledView>
	);
};
