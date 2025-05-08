import { FC, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Folder } from "@/src/types/types";
import { useFolder } from "@/src/hooks/lecture/useFolder";
import { FolderHeader } from "./FolderHeader";
import { FolderTree } from "./FolderTree";

interface FolderExplorerProps {
	rootFolder: Folder;
	onDownloadFile: (id: string, fileName: string, mimetype: string) => void;
}

export const FolderView: FC<FolderExplorerProps> = ({ rootFolder, onDownloadFile }) => {
	const [path, setPath] = useState([{ id: rootFolder.id, name: rootFolder.name }]);
	const { data: folder } = useFolder(path.at(-1)!.id);

	const navigateTo = (id: string, name: string) => setPath((prev) => [...prev, { id, name }]);
	const goBack = () => setPath((prev) => prev.slice(0, -1));

	return (
		<View style={styles.container}>
			<FolderHeader path={path} onBack={goBack} />
			<ScrollView>
				{folder && <FolderTree folder={folder} onSelect={navigateTo} onDownloadFile={onDownloadFile} />}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 12,
	},
});
