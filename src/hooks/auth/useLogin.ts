import { useMutation } from "@tanstack/react-query";
import { useAuthentication } from "../../providers/AuthProvider";
import { getUser } from "../api/api";
import { User, UserResponse } from "@/src/types/types";

function transformToUser(apiUser: UserResponse): User {
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
		try {
			const user = await getUser(auth);
			return { auth, user };
		}catch (e) {
			throw new Error("Benutzername oder Passwort falsch.");
		}
	};

	const mutation = useMutation({
		mutationFn: onLogin,
		onSuccess: ({ auth, user }) => {
			signIn({ token: auth, user: transformToUser(user as UserResponse) });
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
