import React, { ReactNode, useState } from "react";
import { Linking, View } from "react-native";
import { Button, IconButton, Text, TextInput, useTheme } from "react-native-paper";
import { useLogin } from "@/src/hooks/auth/useLogin";

export default function Login(): ReactNode {
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { colors } = useTheme();
	const { login, isError, isPending, error } = useLogin();

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
				<Text variant="bodyMedium" style={{ color: colors.error }}>
					{error.message}
				</Text>
			)}

			<Button
				mode="contained"
				onPress={() => login({ username, password })}
				style={{ width: "100%", borderRadius: 0, marginTop: 16 }}
				loading={isPending}
				disabled={isPending}
			>
				Login
			</Button>
			<Text
				variant="bodyMedium"
				style={{
					marginTop: 16,
					color: colors.onSurfaceVariant,
					textAlign: "center",
				}}
			>
				Login funktioniert nur mit einem Stud.IP-Account der Uni Oldenburg (
				<Text style={{ color: colors.primary }} onPress={() => Linking.openURL("https://elearning.uni-oldenburg.de")}>
					elearning.uni-oldenburg.de
				</Text>
				)
			</Text>
			<View>
				<IconButton
					icon="github"
					onPress={()=>Linking.openURL("https://github.com/Bjoern-Boehnert/studip_mensa_expo")}
					style={{ width: "100%", borderRadius: 0, marginTop: 16 }}
				/>
			</View>
		</View>
	);
}
