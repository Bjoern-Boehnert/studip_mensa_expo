import React, { Suspense } from "react";
import { StyleSheet, View } from "react-native";
import { ErrorBoundaryWrapper } from "@/src/components/ErrorBoundaryWrapper";
import { LoadingSpinner } from "@/src/components/LoadingSpinner";
import { useLocalSearchParams } from "expo-router";
import { InfoMessage } from "@/src/components/InfoMessage";
import { useLectureModules } from "@/src/hooks/lecture/useLectureModules";
import { FolderView } from "@/src/components/lecture/folder/FolderView";

const Content = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { data: folder } = useLectureModules(id, "top_folder");

	if (folder) {
		return <FolderView rootFolder={folder} />;
	}
	return <InfoMessage text="Keine Daten im Ordner" />;
};

export default function Page() {
	return (
		<ErrorBoundaryWrapper>
			<Suspense fallback={<LoadingSpinner />}>
				<View style={styles.container}>
					<Content />
				</View>
			</Suspense>
		</ErrorBoundaryWrapper>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
