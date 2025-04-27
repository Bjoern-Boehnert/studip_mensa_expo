import { Appbar, Button, useTheme } from "react-native-paper";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Attribute } from "@/src/types/types";
import AttributeFilterList from "@/src/components/mensa/filter/AttributeFilterList";
import { useAsyncStorage } from "@/src/hooks/useAsyncStorage";
import { useRouter } from "expo-router";
import { useAttributes } from "@/src/hooks/mensa/attributes/useAttributes";
import { LoadingSpinner } from "@/src/components/LoadingSpinner";
import { ErrorMessage } from "@/src/components/ErrorMessage";

// Alphabetically order the attributes
const orderAlphabetically = (attributes: Record<string, Attribute>) =>
	Object.fromEntries(
		Object.entries(attributes).sort(([, a], [, b]) => a.label.localeCompare(b.label, "de", { sensitivity: "base" })),
	);

export default function AttributeFilterSettings() {
	const { colors } = useTheme();
	const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
	const { back } = useRouter();
	const { setItem, getItem } = useAsyncStorage<string[]>("attributes");
	const { data: items, isLoading, isError, error } = useAttributes();

	useEffect(() => {
		const fetchAttributes = async () => {
			const stored = await getItem();
			if (stored) {
				setSelectedAttributes(stored);
			}
		};
		void fetchAttributes();
	}, [getItem]);

	// Memoize the ordered attributes list
	const orderedAttributes = useMemo(() => {
		return items?.attributes ? orderAlphabetically(items.attributes) : {};
	}, [items]);

	const handleSave = useCallback(() => {
		setItem(selectedAttributes).then(back);
	}, [selectedAttributes, setItem, back]);

	const renderContent = () => {
		if (isError) {
			return <ErrorMessage text={error.message} />;
		}
		if (isLoading) {
			return <LoadingSpinner />;
		}
		if (!items || !items.attributes) {
			return <ErrorMessage text="	Keine Attribute verfügbar" />;
		}
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
	};

	return (
		<>
			<Appbar.Header style={{ backgroundColor: colors.primaryContainer }}>
				<Appbar.BackAction onPress={back} />
				<Appbar.Content title="Filter Einstellungen" />
			</Appbar.Header>
			<View style={styles.container}>{renderContent()}</View>
		</>
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
