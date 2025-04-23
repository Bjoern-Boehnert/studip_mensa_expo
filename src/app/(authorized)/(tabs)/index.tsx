import React, { useCallback, useState } from "react";
import { ScrollView, View } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import { FoodList } from "@/src/components/list/FoodList";
import { BottomDateBar } from "@/src/components/list/BottomDateBar";
import { AppHeader } from "@/src/components/AppHeader";
import { useStoredAttributes } from "@/src/hooks/useStoredAttributes";
import { useMenu } from "@/src/hooks/useMenu";
import { useAuthenticatedSession } from "@/src/hooks/auth/useAuthenticatedSession";

const today = new Date();
today.setHours(0, 0, 0, 0);

export default function Index() {
	const { token } = useAuthenticatedSession(); // todo: das verwenden, da angemeldet ist

	const { colors } = useTheme();
	const [date, setDate] = useState(today);

	const attributes = useStoredAttributes();
	const { data: items, isLoading } = useMenu(token, date);

	const handleDateChange = useCallback((newDate: Date) => {
		newDate.setHours(0, 0, 0, 0);
		setDate(newDate);
	}, []);

	return (
		<>
			<AppHeader title="Mensa" />

			{isLoading && (
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<ActivityIndicator animating size="large" />
				</View>
			)}

			{!isLoading && items?.menu === false ? (
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<Text style={{ color: colors.error }}>Kein Menü verfügbar</Text>
				</View>
			) : (
				<ScrollView style={{ flex: 1 }}>{items && <FoodList items={items} filterAttributes={attributes} />}</ScrollView>
			)}

			<BottomDateBar initialDate={date} onChange={handleDateChange} />
		</>
	);
}
