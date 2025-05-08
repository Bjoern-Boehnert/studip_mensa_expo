import { FC } from "react";
import { Icon, Text, useTheme } from "react-native-paper";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Folder as FolderType } from "../../../types/types";

export const Folder: FC<{
	folder: FolderType;
	onSelect: (id: string, name: string) => void;
}> = ({ folder, onSelect }) => {
	const { colors } = useTheme();

	return (
		<TouchableOpacity
			onPress={() => onSelect(folder.id, folder.name)}
			style={[styles.box, styles.row, { backgroundColor: colors.elevation.level1 }]}
		>
			<Icon source="folder" size={20} color={colors.primary} />
			<Text variant="bodyMedium" style={{ color: colors.primary }}>
				{folder.name}
			</Text>
		</TouchableOpacity>
	);
};

export const EmptyFolder = () => {
	const { colors } = useTheme();
	return (
		<View style={styles.box}>
			<Icon source="folder-remove-outline" size={20} color={colors.onSurface} />
			<Text variant="bodyMedium" style={{ color: colors.onSurfaceDisabled }}>
				Dieser Ordner ist leer
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	box: {
		minHeight: 50,
		padding: 8,
		borderRadius: 4,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
});
