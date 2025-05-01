import { Button, Searchbar, useTheme } from "react-native-paper";
import React, { Suspense, useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Attribute } from "@/src/types/types";
import AttributeFilterList from "@/src/components/mensa/filter/AttributeFilterList";
import { useRouter } from "expo-router";
import { useAttributes } from "@/src/hooks/mensa/attributes/useAttributes";
import { LoadingSpinner } from "@/src/components/LoadingSpinner";
import { InfoMessage } from "@/src/components/InfoMessage";
import { ErrorBoundaryWrapper } from "@/src/components/ErrorBoundaryWrapper";
import { useStoredAttributes } from "@/src/hooks/mensa/attributes/useStoredAttributes";

const orderAlphabetically = (attributes: Record<string, Attribute>) =>
	Object.fromEntries(
		Object.entries(attributes).sort(([, a], [, b]) => a.label.localeCompare(b.label, "de", { sensitivity: "base" })),
	);

const AttributeFilterSettingsContent = () => {
	const { attributes: selectedAttributes, update, save } = useStoredAttributes();
	const { back } = useRouter();
	const { data: items } = useAttributes();
	const { colors } = useTheme();
	const [searchQuery, setSearchQuery] = useState("");

	const orderedAttributes = useMemo(() => {
		return items?.attributes ? orderAlphabetically(items.attributes) : {};
	}, [items]);

	const filtered = useMemo(() => {
		return Object.entries(orderedAttributes).filter(
			([key, attr]) =>
				attr.label.toLowerCase().includes(searchQuery.toLowerCase()) || key.includes(searchQuery.toLowerCase()),
		);
	}, [orderedAttributes, searchQuery]);

	const handleSave = useCallback(() => {
		save();
		back();
	}, [save, back]);

	return (
		<>
			<View style={styles.component}>
				<View style={[styles.searchContainer, { borderColor: colors.outline }]}>
					<Searchbar
						placeholder="Attribut suchen..."
						onChangeText={setSearchQuery}
						value={searchQuery}
						style={{ backgroundColor: colors.surfaceVariant }}
					/>
				</View>
				{filtered.length > 0 ? (
					<AttributeFilterList
						attributes={filtered}
						selected={selectedAttributes.map(([key]) => key)}
						onChange={update}
					/>
				) : (
					<InfoMessage text="Keine Suchergebnisse" />
				)}
			</View>
			<View style={styles.buttonContainer}>
				<Button mode="contained" onPress={handleSave}>
					Speichern
				</Button>
			</View>
		</>
	);
};

export default function AttributeFilterSettings() {
	return (
		<ErrorBoundaryWrapper>
			<Suspense fallback={<LoadingSpinner />}>
				<View style={styles.container}>
					<AttributeFilterSettingsContent />
				</View>
			</Suspense>
		</ErrorBoundaryWrapper>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	component: {
		flex: 1,
		paddingHorizontal: 16,
		maxHeight: "85%",
		marginVertical: 16,
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
		paddingVertical: 8,
		borderBottomWidth: 1,
	},
	buttonContainer: {
		marginHorizontal: 32,
	},
});
