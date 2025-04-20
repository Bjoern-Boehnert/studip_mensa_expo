import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import * as SecureStore from "expo-secure-store";
import { Text, Button } from "react-native";
import { router } from "expo-router";
import AuthProvider, { useAuthSession, User } from "@/src/providers/AuthProvider";

jest.mock("expo-router", () => ({
	router: {
		replace: jest.fn(),
	},
}));

jest.mock("expo-secure-store", () => ({
	getItemAsync: jest.fn(),
	setItemAsync: jest.fn(),
	deleteItemAsync: jest.fn(),
}));

const dummyUser: User = {
	id: "1",
	username: "bjoern",
	name: { given: "Björn", family: "Testmann" },
	email: "bjoern@test.de",
	avatar: { original: "" },
};

const TestComponent = () => {
	const { signIn, signOut, user, token } = useAuthSession();

	return (
		<>
			<Text testID="username">{user?.username ?? "no-user"}</Text>
			<Text testID="token">{token?.current ?? "no-token"}</Text>
			<Button title="SignIn" onPress={() => signIn({ token: "abc123", user: dummyUser })} />
			<Button title="SignOut" onPress={signOut} />
		</>
	);
};

describe("AuthProvider", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("handles signIn and signOut with navigation", async () => {
		const { getByText, getByTestId } = render(
			<AuthProvider>
				<TestComponent />
			</AuthProvider>
		);

		await act(async () => {
			fireEvent.press(getByText("SignIn"));
		});

		expect(SecureStore.setItemAsync).toHaveBeenCalled();
		expect(getByTestId("username").props.children).toBe("bjoern");
		expect(getByTestId("token").props.children).toBe("abc123");
		expect(router.replace).toHaveBeenCalledWith("/");

		await act(async () => {
			fireEvent.press(getByText("SignOut"));
		});

		expect(SecureStore.deleteItemAsync).toHaveBeenCalled();
		expect(getByTestId("username").props.children).toBe("no-user");
		expect(getByTestId("token").props.children).toBe("no-token");
		expect(router.replace).toHaveBeenCalledWith("/login");
	});
});
