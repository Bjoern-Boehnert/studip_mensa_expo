import React from "react";
import { Card, Text, useTheme } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { LectureEvent } from "../../types/types";
import { formatInTimeZone } from "date-fns-tz";
import { de } from "date-fns/locale";

type Props = {
	event: LectureEvent;
};

const toBerlinDate = (unix: number, formatStr: string): string => {
	return formatInTimeZone(unix * 1000, "Europe/Berlin", formatStr, { locale: de });
};

export const LectureEventCard: React.FC<Props> = ({ event }) => {
	const theme = useTheme();
	const start = toBerlinDate(event.start, "HH:mm");
	const end = toBerlinDate(event.end, "HH:mm");

	return (
		<Card style={[styles.card, { backgroundColor: theme.colors.elevation.level1 }]}>
			<Card.Content>
				<Text variant="bodyMedium" style={styles.title}>
					{event.title}
				</Text>

				<View style={styles.row}>
					<Text variant="bodyLarge">
						{start} – {end}
					</Text>
					<Text variant="bodyLarge">{event.room}</Text>
				</View>

				{event.canceled && (
					<Text variant="bodyMedium" style={[styles.canceledText, { color: theme.colors.onErrorContainer }]}>
						Abgesagt
					</Text>
				)}
			</Card.Content>
		</Card>
	);
};

const styles = StyleSheet.create({
	card: {
		marginBottom: 12,
	},
	title: {
		marginBottom: 4,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	canceledText: {
		marginTop: 4,
	},
});
