import { FC } from "react";
import { Icon, Text, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { File as FileType } from "../../../types/types";
import { formatDate, getEuropeDate } from "@/src/utils/time";
import { formatFileSize } from "@/src/utils/parse";

const getFileIcon = (mimeType: string) => {
	if (mimeType.includes("pdf")) {
		return "file-pdf-box";
	} else if (mimeType.includes("image")) {
		return "image";
	} else if (mimeType.includes("text")) {
		return "file-document";
	} else {
		return "file";
	}
};

export const File: FC<{
	file: FileType;
}> = ({ file }) => {
	const { colors } = useTheme();

	return (
		<View style={[styles.box, { backgroundColor: colors.elevation.level1 }]}>
			<View style={styles.row}>
				<Icon source={getFileIcon(file.mime_type)} size={20} color={colors.onSurface} />
				<Text variant="bodyMedium" style={[styles.name, { color: colors.onSurface }]} numberOfLines={2}>
					{file.name}
				</Text>
			</View>
			<View style={styles.row}>
				<Text variant="bodySmall">Geändert am: {formatDate(getEuropeDate(file.chdate), "dd.MM.yyyy HH:mm")}</Text>
			</View>
			<View style={styles.row}>
				<Text variant="bodySmall">Größe: {formatFileSize(file.size)}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	box: {
		padding: 8,
		borderRadius: 4,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	name: {
		flexShrink: 1,
		flexGrow: 1,
		paddingRight: 8,
	},
});
