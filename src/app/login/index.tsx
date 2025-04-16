import React, { ReactNode, useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { useAuthSession } from "@/src/providers/AuthProvider";
import { fetch } from "expo/fetch";
import { BASEURL } from "@/src/hooks/api";

const tryLogin = async (username: string, password: string) => {
	try {
		const auth = btoa(username + ":" + password);
		const response = await fetch(`${BASEURL}/user`, {
			headers: {
				Authorization: `Basic ${auth}`,
				Accept: "application/json",
			},
		});
		if (!response.ok) return false;

		const contentType = response.headers.get("content-type") || "";
		return contentType.includes("application/json");
	} catch (error) {
		return false;
	}
};

export default function Login(): ReactNode {
	const { signIn } = useAuthSession();
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const theme = useTheme();

	const login = async () => {
		setLoading(true);
		setError(false);
		if (await tryLogin(username, password)) {
			const auth = btoa(username + ":" + password);
			signIn(auth);
		} else {
			setError(true);
		}
		setLoading(false);
	};

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				padding: 16,
				backgroundColor: theme.colors.background,
			}}
		>
			<Text
				variant="displaySmall"
				style={{
					marginBottom: 8,
					fontWeight: "bold",
					textAlign: "center",
					color: theme.colors.primary,
				}}
			>
				StudIP Mensa App
			</Text>

			<Text variant="headlineMedium" style={{ marginBottom: 24 }}>
				Login
			</Text>

			<TextInput
				label="Benutzername"
				value={username}
				onChangeText={setUsername}
				style={{ width: "100%", marginBottom: 16 }}
				autoCapitalize="none"
			/>

			<TextInput
				label="Passwort"
				value={password}
				onChangeText={setPassword}
				secureTextEntry={!showPassword}
				style={{ width: "100%", marginBottom: 16 }}
				right={
					<TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={() => setShowPassword(!showPassword)} />
				}
			/>

			{error && (
				<Text style={{ color: theme.colors.error, marginBottom: 16 }}>
					Login fehlgeschlagen. Bitte überprüfe deine Eingaben.
				</Text>
			)}

			<Button
				mode="contained"
				onPress={login}
				loading={loading}
				disabled={loading}
				style={{ width: "100%", borderRadius: 0, marginTop: 16 }}
			>
				Login
			</Button>
			<Text
				style={{
					marginTop: 16,
					color: theme.colors.onSurfaceVariant,
					fontSize: 12,
					textAlign: "center",
				}}
			>
				Login funktioniert nur mit einem Stud.IP-Account der Uni Oldenburg (
				<Text style={{ color: theme.colors.primary }}>elearning.uni-oldenburg.de</Text>)
			</Text>
		</View>
	);
}
