import { FC, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Folder } from "@/src/types/types";
import { useFolder } from "@/src/hooks/lecture/useFolder";
import { FolderHeader } from "./FolderHeader";
import { FolderTree } from "./FolderTree";
import { LoadingSpinner } from "@/src/components/LoadingSpinner";

interface FolderExplorerProps {
	rootFolder: Folder;
}

export const FolderView: FC<FolderExplorerProps> = ({ rootFolder }) => {
	const [path, setPath] = useState([{ id: rootFolder.id, name: rootFolder.name || "/" }]);
	const { data: folder, isLoading } = useFolder(path.at(-1)!.id);

	const navigateTo = (id: string, name: string) => setPath((prev) => [...prev, { id, name }]);
	const goBack = () => setPath((prev) => prev.slice(0, -1));

	return (
		<View style={styles.container}>
			<FolderHeader path={path} onBack={goBack} />
			<ScrollView>
				{isLoading ? <LoadingSpinner /> : folder && <FolderTree folder={folder} onSelect={navigateTo} />}
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
