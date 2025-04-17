import React, { useState, useMemo, useCallback } from "react";
import { FlatList, View } from "react-native";
import { Checkbox, Searchbar } from "react-native-paper";
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
			label={`${attribute.label} (${attribute.code})`}
			status={selected ? "checked" : "unchecked"}
			onPress={() => onToggle(attributeKey)}
			disabled={attribute.inactive}
		/>
	);
});

CheckboxItem.displayName = "CheckboxItem";

export default function AttributeFilterList({ attributes, selected, onChange }: Props) {
	const [searchQuery, setSearchQuery] = useState("");

	// Memoize the filtered attributes based on search query
	const filtered = useMemo(() => {
		return Object.entries(attributes).filter(([_, attr]) =>
			attr.label.toLowerCase().includes(searchQuery.toLowerCase()),
		);
	}, [attributes, searchQuery]);

	// Memoize handleToggle to avoid unnecessary re-renders
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
		<View style={{ padding: 16 }}>
			<Searchbar
				placeholder="Attribut suchen..."
				onChangeText={setSearchQuery}
				value={searchQuery}
				style={{ marginBottom: 8 }}
			/>
			<FlatList
				data={filtered}
				keyExtractor={([key, _]) => key}
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
