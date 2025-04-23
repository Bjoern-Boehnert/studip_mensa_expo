import { useMutation } from "@tanstack/react-query";
import { APIUser, useAuthentication, User } from "../providers/AuthProvider";
import { getUser } from "./api";

function transformToUser(apiUser: APIUser): User {
	return {
		id: apiUser.user_id,
		username: apiUser.username,
		name: apiUser.name,
		email: apiUser.email,
		avatar: {
			original: apiUser.avatar_original,
		},
	};
}

type LoginCredentials = {
	username: string;
	password: string;
};

export const useLogin = () => {
	const { signIn } = useAuthentication();

	const onLogin = async ({ username, password }: LoginCredentials) => {
		const auth = btoa(`${username}:${password}`);
		const user = await getUser(auth);
		if (!user) throw new Error("Login fehlgeschlagen");
		return { auth, user };
	};

	const mutation = useMutation({
		mutationFn: onLogin,
		onSuccess: ({ auth, user }) => {

			signIn({ token: auth, user: transformToUser(user) });
		},
	});

	const login = (credentials: LoginCredentials) => {
		mutation.mutate(credentials);
	};

	return {
		login,
		...mutation,
	};
};
