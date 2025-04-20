import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useAuthSession } from "@/src/providers/AuthProvider";
import { ActivityIndicator, Appbar, Avatar, Text, useTheme } from "react-native-paper";
import { Menu } from "@/src/types/types";
import { FoodList } from "@/src/components/list/FoodList";
import { getMenu } from "@/src/hooks/api";
import { BottomDateBar } from "@/src/components/list/BottomDateBar";
import { useAsyncStorage } from "@/src/hooks/useAsyncStorage";
import { useQuery } from "@tanstack/react-query";

const today = new Date();
today.setHours(0, 0, 0, 0);

export default function Index() {
	const { signOut, token, user } = useAuthSession();
	const { colors } = useTheme();
	const [date, setDate] = useState(today);
	const [filterAttributes, setFilterAttributes] = useState<string[]>([]);
	const { getItem } = useAsyncStorage<string[]>("attributes");

	useEffect(() => {
		const load = async () => {
			const attributes = await getItem();
			if (attributes) {
				setFilterAttributes(attributes);
			}
		};
		void load();
	}, [getItem]);

	const { data: items, isLoading } = useQuery<Menu | null>({
		queryKey: ["menu", token?.current, date.toISOString()],
		queryFn: async () => {
			if (!token?.current) return null;
			const data = await getMenu(token.current, date);
			return data?.menu ? data : { menu: false };
		},
		enabled: !!token?.current, // Nur ausführen, wenn token verfügbar
	});

	const handleDateChange = useCallback((newDate: Date) => {
		newDate.setHours(0, 0, 0, 0);
		setDate(newDate);
	}, []);

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
				<ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
					{items && <FoodList items={items} filterAttributes={filterAttributes} />}
				</ScrollView>
			)}

			<BottomDateBar initialDate={date} onChange={handleDateChange} />
		</>
	);
}
