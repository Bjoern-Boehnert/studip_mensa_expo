import React from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export const LoadingSpinner: React.FC = () => {
	return (
		<View style={styles.container}>
			<ActivityIndicator animating size="large" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
