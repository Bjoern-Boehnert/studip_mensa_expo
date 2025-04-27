import React, { FC, useCallback, useState } from "react";
import { ScrollView, View } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import { FoodList } from "@/src/components/mensa/list/FoodList";
import { BottomDateBar } from "@/src/components/mensa/list/BottomDateBar";
import { AppHeader } from "@/src/components/AppHeader";
import { useStoredAttributes } from "@/src/hooks/useStoredAttributes";
import { useMenu } from "@/src/hooks/useMenu";
import { useAuthenticatedSession } from "@/src/hooks/auth/useAuthenticatedSession";
import { useFocusEffect } from "@react-navigation/native";
import { LoadingSpinner } from "@/src/components/LoadingSpinner";

const normalizeDate = (input: Date) => {
	const date = new Date(input);
	date.setHours(0, 0, 0, 0);
	return date;
};

export default function Index() {
	const { token } = useAuthenticatedSession();
	const [rawDate, setRawDate] = useState(new Date());
	const date = normalizeDate(rawDate);
	const { attributes, reloadAttributes } = useStoredAttributes();
	const { data: items, isLoading } = useMenu(token, date);

	// Attribute neu laden
	useFocusEffect(
		useCallback(() => {
			reloadAttributes();
		}, [reloadAttributes]),
	);

	const renderContent = () => {
		if (isLoading) {
			return <LoadingSpinner />;
		}
		if (items) {
			if (items.menu !== false) {
				return <FoodList items={items} filterAttributes={attributes} />;
			}
		}
		return <NoMenuScreen />;
	};

	return (
		<>
			<AppHeader title="Mensa" />
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>{renderContent()}</ScrollView>
			<BottomDateBar initialDate={date} onChange={setRawDate} />
		</>
	);
}

const NoMenuScreen = () => {
	const { colors } = useTheme();

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text variant="bodyLarge" style={{ color: colors.error }}>
				Kein Menü verfügbar
			</Text>
		</View>
	);
};
