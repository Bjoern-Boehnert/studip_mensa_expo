import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useAuthSession } from "@/src/providers/AuthProvider";
import { ActivityIndicator, Appbar, Avatar, Text, useTheme } from "react-native-paper";
import { Menu } from "@/src/types/types";
import { FoodList } from "@/src/components/list/FoodList";
import { getMenu } from "@/src/hooks/api";
import { BottomDateBar } from "@/src/components/list/BottomDateBar";
import { useAsyncStorage } from "@/src/hooks/useAsyncStorage";

const date = new Date();
date.setHours(0, 0, 0, 0);

export default function Index() {
	const { signOut, token, user } = useAuthSession();
	const { colors } = useTheme();
	const [items, setItems] = useState<Menu | null>(null);
	const [filterAttributes, setFilterAttributes] = useState<string[]>([]);
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
		const load = async () => {
			const attributes = await getItem();
			if (attributes) {
				setFilterAttributes(attributes);
			}
		};
		void load();
	}, [filterAttributes, getItem]);

	useEffect(() => {
		void handleDateChange(date);
	}, [date, handleDateChange]);

	const logout = () => {
		signOut();
	};
	return (
		<>
			<Appbar.Header style={{ backgroundColor: colors.primaryContainer }}>
				<Appbar.Content title="Mensa" />
				{user?.avatar.original && (
					<Avatar.Image size={36} source={{ uri: user.avatar.original }} style={{ marginRight: 10 }} />
				)}
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
					{items && <FoodList items={items} filterAttributes={filterAttributes} />}
				</ScrollView>
			)}
			<BottomDateBar initialDate={date} onChange={handleDateChange} />
		</>
	);
}
