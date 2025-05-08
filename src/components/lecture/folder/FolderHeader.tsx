import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";

interface FolderHeaderProps {
	path: { id: string; name: string }[];
	onBack: () => void;
}

export const FolderHeader: FC<FolderHeaderProps> = ({ path, onBack }) => {
	const { colors } = useTheme();

	return (
		<View style={styles.header}>
			<IconButton icon="arrow-left" onPress={onBack} disabled={path.length <= 1} />
			<Text variant="bodyMedium" style={{ color: colors.onSurface }}>
				{path.at(-1)?.name}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
	},
});
