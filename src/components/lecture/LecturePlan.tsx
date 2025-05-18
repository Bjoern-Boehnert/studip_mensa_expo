import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text as RNText, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { LectureEvent } from "../../types/types";
import { LectureEventCard } from "./LectureEventCard";
import { formatDate, getEuropeDate } from "@/src/utils/time";
import { DateBar } from "@/src/components/DateBar";

type Props = {
	items: LectureEvent[];
	onContinue: (courseRoute: string) => void;
};

const START_HOUR = 8;
const END_HOUR = 20;
const SPACING = 5;
const HOUR_BLOCK_HEIGHT = 80;
const PIXELS_PER_MINUTE = HOUR_BLOCK_HEIGHT / 60;

export const LecturePlan: React.FC<Props> = ({ items, onContinue }) => {
	const theme = useTheme();
	const [selectedIndex, setSelectedIndex] = useState(0);

	const uniqueDates = useMemo(() => {
		const set = new Set(items.map((e) => formatDate(getEuropeDate(e.start), "yyyy-MM-dd")));
		return Array.from(set).sort();
	}, [items]);

	const selectedDate = uniqueDates[selectedIndex];

	const eventsForDay = useMemo(() => {
		return items.filter((e) => formatDate(getEuropeDate(e.start), "yyyy-MM-dd") === selectedDate);
	}, [items, selectedDate]);

	const renderHourLines = () =>
		Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => (
			<View key={i} style={[styles.hourLine, { top: i * HOUR_BLOCK_HEIGHT }]} />
		));

	const renderHourLabels = () =>
		Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => (
			<RNText key={i} style={[styles.hourLabel, { top: i * HOUR_BLOCK_HEIGHT - 10 }]}>
				{`${START_HOUR + i}:00`}
			</RNText>
		));

	const renderEvents = () => {
		return eventsForDay.map((event) => {
			const start = getEuropeDate(event.start);
			const end = getEuropeDate(event.end);
			const minutesSinceStart = (start.getHours() - START_HOUR) * 60 + start.getMinutes();
			const duration = (end.getTime() - start.getTime()) / 60000;

			return (
				<LectureEventCard
					key={event.event_id}
					event={event}
					onContinue={onContinue}
					style={{
						position: "absolute",
						top: minutesSinceStart * PIXELS_PER_MINUTE + SPACING,
						height: duration * PIXELS_PER_MINUTE - SPACING * 2,
						marginHorizontal: SPACING,
						left: 0,
						right: 0,
					}}
				/>
			);
		});
	};

	return (
		<View style={[styles.container, { backgroundColor: theme.colors.background }]}>
			{eventsForDay.length > 0 ? (
				<ScrollView
					contentContainerStyle={{
						flexDirection: "row",
						height: (END_HOUR - START_HOUR + 1) * HOUR_BLOCK_HEIGHT,
						paddingVertical: 8,
					}}
				>
					<View style={styles.timeColumn}>{renderHourLabels()}</View>
					<View style={styles.eventColumn}>
						{renderHourLines()}
						{renderEvents()}
					</View>
				</ScrollView>
			) : (
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<Text variant="titleLarge" style={{ textAlign: "center" }}>
						Keine Termine
					</Text>
				</View>
			)}

			<View style={[styles.outerContainer, { borderColor: theme.colors.outline }]}>
				<DateBar
					initialDate={new Date(uniqueDates[0])}
					validRange={{ endDate: new Date(uniqueDates[uniqueDates.length - 1]) }}
					onChange={(date) => {
						const formatted = formatDate(date, "yyyy-MM-dd");
						const newIndex = uniqueDates.indexOf(formatted);
						setSelectedIndex(newIndex);
					}}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	navRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 16,
	},
	dateText: {
		textAlign: "center",
		flex: 1,
	},
	timeColumn: {
		width: 60,
		position: "relative",
	},
	hourLabel: {
		position: "absolute",
		right: 8,
		color: "#888",
	},
	eventColumn: {
		flex: 1,
		position: "relative",
	},
	hourLine: {
		position: "absolute",
		left: 0,
		right: 0,
		height: 1,
		backgroundColor: "#ccc",
	},
	outerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 8,
		borderTopWidth: 2,
	},
});
