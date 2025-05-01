import React, { useCallback, useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Checkbox, List, useTheme } from "react-native-paper";
import { Attribute } from "@/src/types/types";

type Props = {
	attributes: [string, Attribute][];
	selected: string[];
	onChange: (selected: [string, Attribute][]) => void;
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
	const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

	const groupedAttributes = useMemo(() => {
		const map: Record<string, [string, Attribute][]> = {};
		for (const [key, attr] of attributes) {
			const group = attr.group || "Sonstige";
			if (!map[group]) map[group] = [];
			map[group].push([key, attr]);
		}
		return map;
	}, [attributes]);

	const handleToggle = useCallback(
		(id: string) => {
			const newSelected = selected.includes(id)
				? selected.filter((s) => s !== id)
				: [...selected, id];

			const selectedTuples: [string, Attribute][] = attributes.filter(([key]) =>
				newSelected.includes(key)
			);

			onChange(selectedTuples);
		},
		[attributes, selected, onChange],
	);


	const handleAccordionPress = (group: string) => {
		setExpandedGroups((prev) => {
			const newExpandedGroups = new Set(prev);
			if (newExpandedGroups.has(group)) {
				newExpandedGroups.delete(group);
			} else {
				newExpandedGroups.add(group);
			}
			return newExpandedGroups;
		});
	};

	return (
		<View style={styles.container}>
			<ScrollView>
				{Object.entries(groupedAttributes).map(([group, items]) => (
					<List.Accordion
						key={group}
						title={group}
						expanded={expandedGroups.has(group)}
						onPress={() => handleAccordionPress(group)}
					>
						{items.map(([attributeKey, attribute]) => (
							<CheckboxItem
								key={attributeKey}
								attributeKey={attributeKey}
								attribute={attribute}
								selected={selected.includes(attributeKey)}
								onToggle={handleToggle}
							/>
						))}
					</List.Accordion>
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
