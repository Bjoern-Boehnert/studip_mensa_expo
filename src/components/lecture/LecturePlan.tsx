import React, { useMemo } from "react";
import { SectionList, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { LectureEvent } from "../../types/types";
import { LectureEventCard } from "./LectureEventCard";
import { formatDate, getEuropeDate } from "@/src/utils/time";

type Props = {
	items: LectureEvent[];
	onContinue: (courseRoute: string) => void;
};

type Section = {
	title: string;
	date: string;
	data: LectureEvent[];
};

const groupEventsByDate = (events: LectureEvent[]): Section[] => {
	const groups: Record<string, LectureEvent[]> = {};

	events.forEach((event) => {
		const date = formatDate(getEuropeDate(event.start), "yyyy-MM-dd");
		if (!groups[date]) groups[date] = [];
		groups[date].push(event);
	});

	return Object.entries(groups)
		.map(([date, data]) => ({
			title: formatDate(new Date(date), "EEEE, dd. MMMM yyyy"),
			date,
			data: data.sort((a, b) => a.start - b.start),
		}))
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const LecturePlan: React.FC<Props> = ({ items, onContinue }) => {
	const theme = useTheme();
	const sections = useMemo(() => groupEventsByDate(items), [items]);

	return (
		<SectionList
			sections={sections}
			keyExtractor={(item) => item.event_id}
			renderItem={({ item }) => (
				<View style={styles.cardWrapper}>
					<LectureEventCard event={item} onContinue={onContinue} />
				</View>
			)}
			renderSectionHeader={({ section: { title } }) => (
				<View style={styles.sectionHeader}>
					<Text variant="titleMedium" style={styles.sectionTitle}>
						{title}
					</Text>
				</View>
			)}
			ListEmptyComponent={
				<View style={styles.emptyContainer}>
					<Text variant="titleMedium" style={{ textAlign: "center" }}>
						Keine Termine vorhanden
					</Text>
				</View>
			}
			contentContainerStyle={[
				styles.container,
				{ backgroundColor: theme.colors.background },
			]}
			showsVerticalScrollIndicator={false}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingBottom: 32,
	},
	cardWrapper: {
		marginBottom: 12,
	},
	sectionHeader: {
		marginTop: 24,
		marginBottom: 8,
	},
	sectionTitle: {
		fontWeight: "600",
		fontSize: 16,
	},
	emptyContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 48,
	},
});
