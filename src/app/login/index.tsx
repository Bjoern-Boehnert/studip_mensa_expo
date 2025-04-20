import React, { ReactNode, useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { APIUser, useAuthSession, User } from "@/src/providers/AuthProvider";
import { fetch } from "expo/fetch";
import { BASEURL } from "@/src/hooks/api";
import { useMutation } from "@tanstack/react-query";

function transformToUser(apiUser: APIUser): User {
	return {
		id: apiUser.user_id,
		username: apiUser.username,
		name: {
			family: apiUser.name.family,
			given: apiUser.name.given,
		},
		email: apiUser.email,
		avatar: {
			original: apiUser.avatar_original,
		},
	};
}

const loginMutation = async ({ username, password }: { username: string; password: string }) => {
	const auth = btoa(username + ":" + password);
	const response = await fetch(`${BASEURL}/user`, {
		headers: {
			Authorization: `Basic ${auth}`,
			Accept: "application/json",
		},
	});

	if (!response.ok) throw new Error("Nutzername oder Passwort falsch!");
	try {
		return (await response.json()) as APIUser;
	} catch {
		throw new Error("Antwort konnte nicht verarbeitet werden!");
	}
};

export default function Login(): ReactNode {
	const { signIn } = useAuthSession();
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { colors } = useTheme();

	const { isError, isPending, mutate } = useMutation({
		mutationFn: loginMutation,
		onSuccess: (data) => {
			const auth = btoa(username + ":" + password);
			signIn({ token: auth, user: transformToUser(data) });
		},
	});

	const login = () => {
		mutate({ username, password });
	};

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				padding: 16,
				backgroundColor: colors.background,
			}}
		>
			<Text
				variant="displaySmall"
				style={{
					marginBottom: 8,
					fontWeight: "bold",
					textAlign: "center",
					color: colors.primary,
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

			{isError && (
				<Text style={{ color: colors.error, marginBottom: 16 }}>
					Login fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.
				</Text>
			)}

			<Button
				mode="contained"
				onPress={login}
				style={{ width: "100%", borderRadius: 0, marginTop: 16 }}
				loading={isPending}
				disabled={isPending}
			>
				Login
			</Button>
			<Text
				style={{
					marginTop: 16,
					color: colors.onSurfaceVariant,
					fontSize: 12,
					textAlign: "center",
				}}
			>
				Login funktioniert nur mit einem Stud.IP-Account der Uni Oldenburg (
				<Text style={{ color: colors.primary }}>elearning.uni-oldenburg.de</Text>)
			</Text>
		</View>
	);
}
