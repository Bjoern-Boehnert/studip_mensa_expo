import React from "react";
import { Card, Text, useTheme } from "react-native-paper";
import { View } from "react-native";
import { LectureEvent } from "../../types/types";
import { formatInTimeZone } from "date-fns-tz";
import { de } from "date-fns/locale";

const toBerlinDate = (unix: number, formatStr: string): string => {
	return formatInTimeZone(unix * 1000, "Europe/Berlin", formatStr, {
		locale: de,
	});
};

type Props = {
	event: LectureEvent;
};

export const LectureEventCard: React.FC<Props> = ({ event }) => {
	const theme = useTheme();
	const start = toBerlinDate(event.start, "HH:mm");
	const end = toBerlinDate(event.end, "HH:mm");

	return (
		<Card
			style={{
				marginBottom: 12,
				backgroundColor: theme.colors.elevation.level1,
			}}
		>
			<Card.Content>
				<Text variant="bodyMedium" style={{ marginBottom: 4 }}>
					{event.title}
				</Text>

				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
					}}
				>
					<Text variant="bodyLarge" >
						{start} – {end}
					</Text>
					<Text variant="bodyLarge">{event.room}</Text>
				</View>

				{event.canceled && (
					<Text variant="bodyMedium" style={{ color: theme.colors.onErrorContainer, marginTop: 4 }}>
						Abgesagt
					</Text>
				)}
			</Card.Content>
		</Card>
	);
};
