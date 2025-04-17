import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useAuthSession } from "@/src/providers/AuthProvider";
import { ActivityIndicator, Appbar, Text, useTheme } from "react-native-paper";
import { Menu } from "@/src/types/types";
import { FoodList } from "@/src/components/list/FoodList";
import { getMenu } from "@/src/hooks/api";
import { BottomDateBar } from "@/src/components/list/BottomDateBar";
import { useAsyncStorage } from "@/src/hooks/useAsyncStorage";

export default function Index() {
	const { signOut, token } = useAuthSession();
	const { colors } = useTheme();
	const [items, setItems] = useState<Menu | null>(null);
	const { getItem } = useAsyncStorage<string[]>("attributes");

	const handleDateChange = useCallback(
		async (date: Date) => {
			setItems(null);
			if (!token?.current) return;
			const data = await getMenu(token.current, date);
			if (data && data.menu) {
				setItems(data);
			} else {
				setItems({ menu: false } as Menu);
			}
		},
		[token],
	);

	useEffect(() => {
		void handleDateChange(new Date());
	}, [handleDateChange]);

	const logout = () => {
		signOut();
	};

async function fetchAttributes() {
	const attributes = await getItem();
	if (attributes) {
		return attributes;
	} else {
		return [];
	}
}
	return (
		<>
			<Appbar.Header style={{ backgroundColor: colors.primaryContainer }}>
				<Appbar.Content title="Mensa" />
				<Appbar.Action icon="logout" onPress={logout} />
			</Appbar.Header>

			{items === null && (
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<ActivityIndicator animating size="large" />
				</View>
			)}

			{items?.menu === false ? (
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<Text style={{ color: colors.error }}>Kein Menü verfügbar</Text>
				</View>
			) : (
				<ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
					{items && <FoodList items={items } forbiddenAttributes={fetchAttributes} />}
				</ScrollView>
			)}
			<BottomDateBar initialDate={new Date()} onChange={handleDateChange} />
		</>
	);
}
