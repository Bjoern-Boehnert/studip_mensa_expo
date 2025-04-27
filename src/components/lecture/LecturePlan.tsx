import React, { useMemo } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { LectureEvent } from "../../types/types";
import { LectureEventCard } from "./LectureEventCard";
import { formatLocalTime } from "@/src/components/lecture/formatLocalTime";

type Props = {
	items: LectureEvent[];
};

type GroupedEvents = {
	date: string;
	events: LectureEvent[];
};

const groupEventsByDate = (events: LectureEvent[]): GroupedEvents[] => {
	const groups: Record<string, LectureEvent[]> = {};

	events.forEach((event) => {
		const day = formatLocalTime(event.start, "yyyy-MM-dd");
		if (!groups[day]) groups[day] = [];
		groups[day].push(event);
	});

	return Object.entries(groups)
		.map(([date, events]) => ({
			date,
			events: events.sort((a, b) => a.start - b.start),
		}))
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const LecturePlan: React.FC<Props> = ({ items }) => {
	const theme = useTheme();

	const groupedEvents = useMemo(() => groupEventsByDate(items), [items]);

	return (
		<ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
			{groupedEvents.map((group) => {
				const dateObj = new Date(group.date);
				return (
					<View key={group.date} style={styles.dateGroup}>
						<Text variant="bodyMedium" style={styles.dateText}>
							{format(dateObj, "EEEE, dd. MMMM yyyy", { locale: de })}
						</Text>
						{group.events.map((event) => (
							<LectureEventCard key={event.event_id} event={event} />
						))}
					</View>
				);
			})}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	dateGroup: {
		marginBottom: 24,
	},
	dateText: {
		marginBottom: 8,
	},
});
