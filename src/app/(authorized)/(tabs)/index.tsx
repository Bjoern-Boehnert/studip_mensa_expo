import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useAuthSession } from "@/src/providers/AuthProvider";
import { ActivityIndicator, Appbar, Text, useTheme } from "react-native-paper";
import { Menu } from "@/src/types/types";
import { FoodList } from "@/src/components/list/FoodList";
import { getMenu } from "@/src/hooks/api";
import { BottomDateBar } from "@/src/components/list/BottomDateBar";
import { useAsyncStorage } from "@/src/hooks/useAsyncStorage";

function getFilteredItems(menu: Menu, filterItems: string[]) {
	if (!filterItems || filterItems.length === 0 || menu.menu === false) return menu;

	const filteredMenu: Exclude<Menu["menu"], false> = {};

	for (const [locationId, stations] of Object.entries(menu.menu)) {
		filteredMenu[locationId] = {};

		for (const [stationName, foodItems] of Object.entries(stations)) {
			filteredMenu[locationId][stationName] = foodItems.filter((item) =>
				item.attributes.some((attr) => filterItems.includes(attr)),
			);
		}
	}

	return { menu: filteredMenu };
}

export default function Index() {
	const { signOut, token } = useAuthSession();
	const { colors } = useTheme();
	const [items, setItems] = useState<Menu | null>(null);
	const { getItem } = useAsyncStorage<string[]>("attributes");

	const handleDateChange = async (date: Date) => {
		setItems(null);
		if (!token?.current) return;
		const data = await getMenu(token.current, date);
		if (data && data.menu) {
			const attributes = await getItem();

			// Filter anwenden
			attributes && setItems(getFilteredItems(data, attributes));
			// setItems(data);
		} else {
			setItems({ menu: false } as Menu);
		}
	};

	useEffect(() => {
		void handleDateChange(new Date());
	}, [token]);

	const logout = () => {
		signOut();
	};

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
					{items && <FoodList items={items} />}
				</ScrollView>
			)}
			<BottomDateBar initialDate={new Date()} onChange={handleDateChange} />
		</>
	);
}
