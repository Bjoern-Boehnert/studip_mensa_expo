import { Appbar, Button, useTheme } from "react-native-paper";
import React, { useState } from "react";
import { useAuthSession } from "@/src/providers/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

export default function Settings() {
	const { colors } = useTheme();
	const { signOut } = useAuthSession();
	const navigation = useNavigation();
	const [filterVisible, setFilterVisible] = useState(false);

	const logout = () => {
		signOut();
	};

	const openFilter = () => {
		setFilterVisible(true);
	};

	const closeFilter = () => {
		setFilterVisible(false);
	};

	return (
		<>
			<Appbar.Header style={{ backgroundColor: colors.primaryContainer }}>
				<Appbar.Content title="Einstellungen" />
				<Appbar.Action icon="logout" onPress={logout} />
			</Appbar.Header>

			<Button mode="contained" onPress={() =>  router.push("/AttributeFilter")} style={{ margin: 16 }}>
				Attribute filtern
			</Button>
		</>
	);
}
