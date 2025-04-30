import React, { useCallback, useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Checkbox, Searchbar, useTheme } from "react-native-paper";
import { Attribute } from "@/src/types/types";

type Props = {
	attributes: Record<string, Attribute>;
	selected: string[];
	onChange: (selected: string[]) => void;
};

const CheckboxItem = React.memo(function CheckboxItem({
	attributeKey,
	attribute,
	selected,
	onToggle,
}: {
	attributeKey: string;
	attribute: Attribute;
	selected: boolean;
	onToggle: (id: string) => void;
}) {
	return (
		<Checkbox.Item
			labelVariant="bodyMedium"
			label={`${attribute.label} (${attributeKey})`}
			status={selected ? "checked" : "unchecked"}
			onPress={() => onToggle(attributeKey)}
			disabled={attribute.inactive}
		/>
	);
});

CheckboxItem.displayName = "CheckboxItem";

export default function AttributeFilterList({ attributes, selected, onChange }: Props) {
	const { colors } = useTheme();
	const [searchQuery, setSearchQuery] = useState("");

	const filtered = useMemo(() => {
		return Object.entries(attributes).filter(
			([key, attr]) =>
				attr.label.toLowerCase().includes(searchQuery.toLowerCase()) || key.includes(searchQuery.toLowerCase()),
		);
	}, [attributes, searchQuery]);

	const handleToggle = useCallback(
		(id: string) => {
			if (selected.includes(id)) {
				onChange(selected.filter((s) => s !== id));
			} else {
				onChange([...selected, id]);
			}
		},
		[selected, onChange],
	);

	return (
		<View style={styles.container}>
			<Searchbar
				placeholder="Attribut suchen..."
				onChangeText={setSearchQuery}
				value={searchQuery}
				style={[styles.searchbar, { backgroundColor: colors.surfaceVariant }]}
			/>
			<FlatList
				data={filtered}
				keyExtractor={([key]) => key}
				extraData={selected}
				renderItem={({ item: [attributeKey, attribute] }) => (
					<CheckboxItem
						attributeKey={attributeKey}
						attribute={attribute}
						selected={selected.includes(attributeKey)}
						onToggle={handleToggle}
					/>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	searchbar: {
		marginBottom: 8,
	},
});
