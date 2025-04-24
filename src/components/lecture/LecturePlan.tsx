import React, { useMemo } from "react";
import { ScrollView, View } from "react-native";
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


export const LecturePlan: React.FC<Props> = ({ items }) => {
	const theme = useTheme();

	const groupedEvents: GroupedEvents[] = useMemo(() => {
		const groups: Record<string, LectureEvent[]> = {};

		items.forEach((event) => {
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
	}, [items]);

	return (
		<ScrollView
			style={{
				flex: 1,
				backgroundColor: theme.colors.background,
				padding: 16,
			}}
		>
			{groupedEvents.map((group) => {
				const dateObj = new Date(group.date);
				return (
					<View key={group.date} style={{ marginBottom: 24 }}>
						<Text variant="bodyMedium" style={{ marginBottom: 8 }}>
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
