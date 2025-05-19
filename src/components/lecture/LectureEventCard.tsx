import React from "react";
import { Card, Text, useTheme } from "react-native-paper";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { LectureEvent } from "../../types/types";
import { formatDate, getEuropeDate } from "@/src/utils/time";

type Props = {
	event: LectureEvent;
	onContinue: (courseRoute: string) => void;
	style?: StyleProp<ViewStyle>;
};

const getTime = (unix: number) => {
	return formatDate(getEuropeDate(unix), "HH:mm");
};

export const LectureEventCard: React.FC<Props> = ({ event, onContinue, style }) => {
	const theme = useTheme();
	const start = getTime(event.start);
	const end = getTime(event.end);

	return (
		<Card style={[style, { backgroundColor: theme.colors.elevation.level1 }]}>
			<Card.Content>
				<Text
					style={[styles.title, { color: theme.colors.primary }]}
					variant="bodyLarge"
					numberOfLines={2}
					onPress={() => onContinue(event.course)}
				>
					{event.title}
				</Text>
				<View style={styles.row}>
					<Text variant="bodyMedium">
						{start} – {end}
					</Text>
					<Text variant="bodyMedium">{event.room}</Text>
				</View>

				{event.description && <Text variant="bodySmall">{event.description}</Text>}
				{event.canceled && (
					<Text variant="bodyMedium" style={[{ color: theme.colors.onErrorContainer }]}>
						Abgesagt
					</Text>
				)}
			</Card.Content>
		</Card>
	);
};

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 8,
	},
	title: {
		overflow: "hidden",
		textOverflow: "ellipsis",
	},
});
