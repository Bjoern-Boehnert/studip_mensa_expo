import React, { FC } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export const LoadingSpinner: FC = () => {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<ActivityIndicator animating size="large" />
		</View>
	);
};
