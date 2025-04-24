import { ActivityIndicator, Appbar, Button, Text, useTheme } from "react-native-paper";
import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Attribute } from "@/src/types/types";
import { useNavigation } from "@react-navigation/native";
import AttributeFilterList from "@/src/components/mensa/filter/AttributeFilterList";
import { useAsyncStorage } from "@/src/hooks/useAsyncStorage";
import { router } from "expo-router";
import { useAttributes } from "@/src/hooks/useAttributes";
import { useAuthenticatedSession } from "@/src/hooks/auth/useAuthenticatedSession";

function orderAlphabetically(attributes: Record<string, Attribute>): Record<string, Attribute> {
	return Object.fromEntries(
		Object.entries(attributes).sort(([, a], [, b]) => a.label.localeCompare(b.label, "de", { sensitivity: "base" })),
	);
}

export default function FilterSettingsScreen() {
	const { colors } = useTheme();
	const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
	const [attributes, setAttributes] = useState<Record<string, Attribute>>({});
	const { token } = useAuthenticatedSession();
	const navigation = useNavigation();
	const { setItem, getItem } = useAsyncStorage<string[]>("attributes");
	const { data: items, isLoading, isError } = useAttributes(token);

	useEffect(() => {
		async function fetchAttributes() {
			const stored = await getItem();
			if (stored) {
				setSelectedAttributes(stored);
			}
		}

		void fetchAttributes();
	}, [getItem]);

	const orderedAttributes = useMemo(() => {
		return items?.attributes ? orderAlphabetically(items.attributes) : {};
	}, [items]);

	useEffect(() => {
		setAttributes(orderedAttributes);
	}, [attributes, orderedAttributes]);

	const handleSave = () => {
		setItem(selectedAttributes).then(router.back);
	};

	return (
		<>
			<Appbar.Header style={{ backgroundColor: colors.primaryContainer }}>
				<Appbar.BackAction onPress={() => navigation.goBack()} />
				<Appbar.Content title="Filter Einstellungen" />
			</Appbar.Header>

			<SafeAreaView style={{ flex: 0.75 }}>
				{isLoading && (
					<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
						<ActivityIndicator animating size="large" color={colors.primary} />
					</View>
				)}

				{!isLoading && (isError || !items) && (
					<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
						<Text variant="bodyLarge" style={{ color: colors.error }}>
							Keine Attribute verfügbar
						</Text>
					</View>
				)}

				{!isLoading && !isError && items && (
					<>
						<AttributeFilterList
							attributes={attributes}
							selected={selectedAttributes}
							onChange={setSelectedAttributes}
						/>
						<Button
							mode="contained"
							style={{ marginHorizontal: 16, marginVertical: 32 }}
							onPress={handleSave}
							accessibilityLabel="Filter speichern"
							disabled={isLoading}
						>
							Speichern
						</Button>
					</>
				)}
			</SafeAreaView>
		</>
	);
}
