import { Appbar, Button, useTheme } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { useAuthSession } from "@/src/providers/AuthProvider";
import { SafeAreaView } from "react-native";
import { Attribute } from "@/src/types/types";
import { getAttributes } from "@/src/hooks/api";
import { useNavigation } from "@react-navigation/native";
import AttributeFilterList from "@/src/components/filter/AttributeFilterList";
import { useAsyncStorage } from "@/src/hooks/useAsyncStorage";
import { router } from "expo-router";
import attributesData from "@/src/components/filter/attributes.json";

function orderAlphabetically(attributes: { [key: string]: Attribute }): Record<string, Attribute> {
	return Object.fromEntries(
		Object.entries(attributes).sort(([, a], [, b]) => a.label.localeCompare(b.label, "de", { sensitivity: "base" })),
	);
}

export default function FilterSettingsScreen() {
	const { colors } = useTheme();
	const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
	const [attributes, setAttributes] = useState<Record<string, Attribute>>({});
	const { token } = useAuthSession();
	const navigation = useNavigation();
	const { setItem, getItem } = useAsyncStorage<string[]>("attributes");

	async function fetchAttributes() {
		const attributes = await getItem();
		if (attributes) {
			setSelectedAttributes(attributes);
		}
	}

	useEffect(() => {
		void fetchAttributes();
	}, []);

	useEffect(() => {
		//Wichtig: Wenn die API immer dieselben Attribute liefern, lesen wir es aus der JSON solange es noch funktioniert ansonsten wie unten fetchen
		setAttributes(orderAlphabetically(attributesData.attributes));

		// if (token?.current) {
		// 	getAttributes(token.current).then((data) => {
		// 		if (data?.attributes) {
		// 			setAttributes(orderAlphabetically(data.attributes));
		// 		}
		// 	});
		// }
	}, [token]);

	return (
		<>
			<Appbar.Header style={{ backgroundColor: colors.primaryContainer }}>
				<Appbar.BackAction onPress={() => navigation.goBack()} />
				<Appbar.Content title="Filter Einstellungen" />
			</Appbar.Header>

			<SafeAreaView style={{ flex: 0.75 }}>
				<AttributeFilterList attributes={attributes} selected={selectedAttributes} onChange={setSelectedAttributes} />
				<Button
					mode="contained"
					style={{ marginHorizontal: 16, marginVertical: 32 }}
					onPress={() => {
						void setItem(selectedAttributes);
						router.back();
					}}
				>
					Speichern
				</Button>
			</SafeAreaView>
		</>
	);
}
