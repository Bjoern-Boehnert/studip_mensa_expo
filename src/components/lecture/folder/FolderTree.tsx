import { FC, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { EmptyFolder, Folder } from "@/src/components/lecture/folder/Folder";
import { File } from "@/src/components/lecture/folder/File";
import { Folder as FolderType } from "../../../types/types";

interface FolderTreeProps {
	folder: FolderType;
	onSelect: (id: string, name: string) => void;
}

export const FolderTree: FC<FolderTreeProps> = ({ folder, onSelect }) => {
	const isEmpty = useMemo(() => folder.subfolders.length === 0 && folder.file_refs.length === 0, [folder]);

	if (isEmpty) {
		return <EmptyFolder />;
	}

	return (
		<View style={styles.folderTree}>
			{folder.subfolders.map((folder) => (
				<Folder key={folder.id} folder={folder} onSelect={onSelect} />
			))}
			{folder.file_refs.map((file) => (
				<File key={file.id} file={file} />
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	folderTree: {
		gap: 8,
	},
});
