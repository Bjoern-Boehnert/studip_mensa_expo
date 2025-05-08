import React, { Suspense } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { ErrorBoundaryWrapper } from "@/src/components/ErrorBoundaryWrapper";
import { LoadingSpinner } from "@/src/components/LoadingSpinner";
import { useLocalSearchParams } from "expo-router";
import { InfoMessage } from "@/src/components/InfoMessage";
import { useLectureFolder } from "@/src/hooks/lecture/useLectureFolder";
import { FolderView } from "@/src/components/lecture/folder/FolderView";
import { useAuthenticatedSession } from "@/src/hooks/auth/useAuthenticatedSession";
import * as FileSystem from "expo-file-system";
import * as API from "@/src/hooks/api/api";

function arrayBufferToBase64(buffer: ArrayBuffer) {
	let binary = "";
	const bytes = new Uint8Array(buffer);
	const len = bytes.byteLength;
	for (let i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return window.btoa(binary);
}

const Content = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { data: folder } = useLectureFolder(id);
	const { token } = useAuthenticatedSession();

	const downloadFile = async (id: string, fileName: string, mimeType: string) => {
		try {
			const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

			if (!permissions.granted) {
				Alert.alert("Zugriff verweigert", "Es konnte keine Berechtigung zum Speichern der Datei gewährt werden.");
				return;
			}

			const response = await API.downloadFile(token, id);
			const base64Data = arrayBufferToBase64(response);

			const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
				permissions.directoryUri,
				fileName,
				mimeType,
			);
			await FileSystem.writeAsStringAsync(fileUri, base64Data, {
				encoding: FileSystem.EncodingType.Base64,
			});

		} catch (error) {
			Alert.alert("Fehler", "Beim Speichern der Datei ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.");
		}
	};

	if (folder) {
		return <FolderView rootFolder={folder} onDownloadFile={downloadFile} />;
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
