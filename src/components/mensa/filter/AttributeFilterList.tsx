import React, { useCallback, useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Checkbox, IconButton, List, useTheme } from "react-native-paper";
import { Attribute } from "@/src/types/types";

type Props = {
	attributes: [string, Attribute][];
	selected: string[];
	onChange: (selected: string[]) => void;
	onClear: () => void;
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

export default function AttributeFilterList({ attributes, selected, onChange, onClear }: Props) {
	const { colors } = useTheme();

	const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
	const [areAllExpanded, setAreAllExpanded] = useState(false);

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
			if (selected.includes(id)) {
				onChange(selected.filter((s) => s !== id));
			} else {
				onChange([...selected, id]);
			}
		},
		[selected, onChange],
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

	const toggleAllAccordions = () => {
		setAreAllExpanded((prev) => {
			const newExpandedState = !prev;
			setExpandedGroups(newExpandedState ? new Set(Object.keys(groupedAttributes)) : new Set());
			return newExpandedState;
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
			<View style={styles.expandAllContainer}>
				<IconButton
					icon={areAllExpanded ? "chevron-up" : "chevron-down"}
					onPress={toggleAllAccordions}
					iconColor={colors.onPrimary}
					style={[styles.expandAll, { backgroundColor: colors.primary, borderRadius: 5 }]}
				/>
				<IconButton

					icon="close"
					onPress={onClear}
					iconColor={colors.onError}
					style={[styles.expandAll, { backgroundColor: colors.error, borderRadius: 5 }]}
				/>

			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	expandAllContainer: {
		flexDirection: "row-reverse",
		alignItems: "flex-end",
		paddingHorizontal: 8,
	},
	expandAll: {
		gap: 5,
	},
});
