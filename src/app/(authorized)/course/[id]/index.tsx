import { Avatar, Button, Card, Divider, Text } from "react-native-paper";
import React, { Suspense } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ErrorBoundaryWrapper } from "@/src/components/ErrorBoundaryWrapper";
import { LoadingSpinner } from "@/src/components/LoadingSpinner";
import { useLectureInfo } from "@/src/hooks/lecture/useLectureInfo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { InfoMessage } from "@/src/components/InfoMessage";

const Content = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { data: course } = useLectureInfo(id);
	const { push } = useRouter();

	if (!course) return <InfoMessage text="Keine Daten" />;

	function navigateCourseFolders(id: string) {
		push(`/course/${id}/topfolder`);
	}

	return (
		<ScrollView contentContainerStyle={styles.scrollContent}>
			<Card style={styles.card}>
				<Card.Title title={course.title} subtitle={course.number} />
				<Card.Content>
					{course.subtitle ? <Text variant="titleMedium">{course.subtitle}</Text> : null}
					<Text style={styles.sectionTitle}>Dozent(en):</Text>
					{Object.values(course.lecturers).map((lecturer) => {
						return (
							<View key={lecturer.id} style={styles.row}>
								<Avatar.Image size={32} source={{ uri: lecturer.avatar_normal }} />
								<Text>{lecturer.name.formatted}</Text>
							</View>
						);
					})}

					<Divider style={styles.divider} />
				</Card.Content>
				<Card.Actions>
					<Button mode="contained" icon="folder" onPress={() => navigateCourseFolders(course.course_id)}>
						Dokumente
					</Button>
				</Card.Actions>
			</Card>
		</ScrollView>
	);
};

export default function Page() {
	return (
		<ErrorBoundaryWrapper>
			<Suspense fallback={<LoadingSpinner />}>
				<View style={styles.container}>
					<Content />
				</View>
			</Suspense>
		</ErrorBoundaryWrapper>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContent: {
		padding: 16,
	},
	card: {
		marginBottom: 16,
	},
	sectionTitle: {
		marginTop: 16,
	},
	divider: {
		marginVertical: 12,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		margin: 8,
	},
});
