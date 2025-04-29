import { Button } from "react-native-paper";
import React, { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Attribute } from "@/src/types/types";
import AttributeFilterList from "@/src/components/mensa/filter/AttributeFilterList";
import { useAsyncStorage } from "@/src/hooks/useAsyncStorage";
import { useRouter } from "expo-router";
import { useAttributes } from "@/src/hooks/mensa/attributes/useAttributes";
import { LoadingSpinner } from "@/src/components/LoadingSpinner";
import { InfoMessage } from "@/src/components/InfoMessage";
import { ErrorBoundaryWrapper } from "@/src/components/ErrorBoundaryWrapper";

// Alphabetically order the attributes
const orderAlphabetically = (attributes: Record<string, Attribute>) =>
	Object.fromEntries(
		Object.entries(attributes).sort(([, a], [, b]) => a.label.localeCompare(b.label, "de", { sensitivity: "base" })),
	);

const AttributeFilterSettingsContent = () => {
	const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
	const { back } = useRouter();
	const { setItem, getItem } = useAsyncStorage<string[]>("attributes");
	const { data: items, isLoading } = useAttributes();

	useEffect(() => {
		const fetchAttributes = async () => {
			const stored = await getItem();
			if (stored) {
				setSelectedAttributes(stored);
			}
		};
		void fetchAttributes();
	}, [getItem]);

	const orderedAttributes = useMemo(() => {
		return items?.attributes ? orderAlphabetically(items.attributes) : {};
	}, [items]);

	const handleSave = useCallback(() => {
		setItem(selectedAttributes).then(back);
	}, [selectedAttributes, setItem, back]);

	if (items && items.attributes) {
		return (
			<>
				<AttributeFilterList
					attributes={orderedAttributes}
					selected={selectedAttributes}
					onChange={setSelectedAttributes}
				/>
				<Button
					mode="contained"
					style={styles.saveButton}
					onPress={handleSave}
					accessibilityLabel="Filter speichern"
					disabled={isLoading}
				>
					Speichern
				</Button>
			</>
		);
	}
	return <InfoMessage text="Keine Attribute verfügbar" />;
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
		flex: 0.75,
	},
	saveButton: {
		marginHorizontal: 16,
		marginVertical: 32,
	},
});
