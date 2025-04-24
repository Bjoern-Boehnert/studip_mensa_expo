import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import React from "react";
import { AppHeader } from "@/src/components/AppHeader";
import { useAuthenticatedSession } from "@/src/hooks/auth/useAuthenticatedSession";
import { useLectures } from "@/src/hooks/useLectures";
import { View } from "react-native";
import { LecturePlan } from "@/src/components/lecture/LecturePlan";

export default function Schedule() {
	const { colors } = useTheme();
	const { token, user } = useAuthenticatedSession();
	const { data, isLoading } = useLectures(token, user.id);

	return (
		<>
			<AppHeader title="Stundenplan" />
			{isLoading && (
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<ActivityIndicator animating size="large" />
				</View>
			)}

			{!isLoading && data === null && (
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<Text style={{ color: colors.error }}>Keine Daten</Text>
				</View>
			)}

			{!isLoading && data && <LecturePlan items={data.collection} />}
		</>
	);
}
