import { Avatar, Button, Card, Divider, Text, useTheme } from "react-native-paper";
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
					{course.subtitle ? <Text variant="titleSmall">{course.subtitle}</Text> : null}
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
	colorgroup: {
		width: 50,
		height: 50,
		margin: 10
	},
	titleGradient: {
		padding: 16,
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
	},
	titleContent: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	rightAccessory: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: "#fff", // or your icon/avatar/etc
	},
});
