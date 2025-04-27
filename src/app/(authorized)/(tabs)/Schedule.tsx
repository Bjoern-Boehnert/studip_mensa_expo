import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import React from "react";
import { AppHeader } from "@/src/components/AppHeader";
import { useAuthenticatedSession } from "@/src/hooks/auth/useAuthenticatedSession";
import { useLectures } from "@/src/hooks/useLectures";
import { View } from "react-native";
import { LecturePlan } from "@/src/components/lecture/LecturePlan";
import { LoadingSpinner } from "@/src/components/LoadingSpinner";
import { FoodList } from "@/src/components/mensa/list/FoodList";

export default function Schedule() {
	const { colors } = useTheme();
	const { token, user } = useAuthenticatedSession();
	const { data: items, isLoading } = useLectures(token, user.id);

	const renderContent = () => {
		if (isLoading) {
			return <LoadingSpinner />;
		}
		if (items) {
			return <LecturePlan items={items.collection} />;
		}
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text style={{ color: colors.error }}>Keine Daten</Text>
			</View>
		);
	};

	return (
		<>
			<AppHeader title="Stundenplan" />
			{renderContent()}
		</>
	);
}
