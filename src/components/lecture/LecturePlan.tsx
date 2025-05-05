import React, { useMemo } from "react";
import { SectionList, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { LectureEvent } from "../../types/types";
import { LectureEventCard } from "./LectureEventCard";
import { formatDate, getEuropeDate } from "@/src/utils/time";

type Props = {
	items: LectureEvent[];
};

type Section = {
	title: string;
	data: LectureEvent[];
};

const groupEventsByDate = (events: LectureEvent[]): Section[] => {
	const groups: Record<string, LectureEvent[]> = {};

	events.forEach((event) => {
		const timeZoneDate = getEuropeDate(event.start);
		const dayKey = formatDate(timeZoneDate, "yyyy-MM-dd");
		if (!groups[dayKey]) groups[dayKey] = [];
		groups[dayKey].push(event);
	});

	return Object.entries(groups)
		.map(([date, events]) => ({
			title: formatDate(new Date(date), "EEEE, dd. MMMM yyyy"),
			data: events.sort((a, b) => a.start - b.start),
		}))
		.sort((a, b) =>
			new Date(a.title).getTime() - new Date(b.title).getTime()
		);
};

export const LecturePlan: React.FC<Props> = ({ items }) => {
	const theme = useTheme();
	const sections = useMemo(() => groupEventsByDate(items), [items]);

	return (
		<SectionList
			sections={sections}
			keyExtractor={(item) => item.event_id}
			renderItem={({ item }) => <LectureEventCard event={item} />}
			renderSectionHeader={({ section: { title } }) => (
				<View style={styles.dateGroup}>
					<Text variant="bodyMedium" style={styles.dateText}>
						{title}
					</Text>
				</View>
			)}
			contentContainerStyle={[
				styles.container,
				{ backgroundColor: theme.colors.background },
			]}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	dateGroup: {
		marginBottom: 8,
		marginTop: 24,
	},
	dateText: {
		marginBottom: 8,
	},
});
