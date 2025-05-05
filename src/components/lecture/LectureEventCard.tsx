import React from "react";
import { Card, IconButton, Text, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { LectureEvent } from "../../types/types";
import { format } from "date-fns";
import { getEuropeDate } from "@/src/utils/time";

type Props = {
	event: LectureEvent;
};

const getTime = (unix: number) => {
	return format(getEuropeDate(unix), "HH:mm");
};

export const LectureEventCard: React.FC<Props> = ({ event }) => {
	const theme = useTheme();
	const start = getTime(event.start);
	const end = getTime(event.end);

	return (
		<Card style={[styles.card, { backgroundColor: theme.colors.elevation.level1 }]}>
			<Card.Title
				titleNumberOfLines={2}
				title={event.title}
				right={(props) => <IconButton {...props} icon="arrow-right" onPress={() => {}} />}
			/>
			<Card.Content>
				<View style={styles.row}>
					<Text variant="bodyLarge">
						{start} – {end}
					</Text>
					<Text variant="bodyLarge">{event.room}</Text>
				</View>

				<Text variant="bodySmall" style={styles.title}>
					{event.categories}
				</Text>

				{event.description && <Text variant="bodySmall">{event.description}</Text>}

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
