import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import {
	createContext,
	MutableRefObject,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";

export interface User {
	id: string;
	username: string;
	name: {
		family: string;
		given: string;
	};
	email: string;
	avatar: {
		original: string;
	};
}

export interface APIUser {
	user_id: string;
	username: string;
	name: {
		family: string;
		given: string;
		prefix: string;
		suffix: string;
	};
	email: string;
	avatar_original: string;
}

interface AuthState {
	token: string | null;
	user: User | null;
}

interface Props {
	signIn: (authState: AuthState) => void;
	signOut: () => void;
	token: MutableRefObject<string | null> | null;
	user: User | null;
	isLoading: boolean;
}

const AuthContext = createContext<Props>({
	signIn: () => null,
	signOut: () => null,
	token: null,
	user: null,
	isLoading: true,
});

export function useAuthentication() {
	return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: ReactNode }): ReactNode {
	const tokenRef = useRef<string | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(async (): Promise<void> => {
			try {
				const authData = await SecureStore.getItemAsync("authState");
				if (authData) {
					const { token, user } = JSON.parse(authData);
					tokenRef.current = token;
					setUser(user);
				} else {
					tokenRef.current = null;
					setUser(null);
				}
			} catch (error) {
				tokenRef.current = null;
				setUser(null);
			}
			setIsLoading(false);
		})();
	}, []);

	const signIn = useCallback(async ({ token, user }: AuthState) => {
		const authState = { token, user };
		await SecureStore.setItemAsync("authState", JSON.stringify(authState));
		tokenRef.current = token;
		setUser(user);
		router.replace("/");
	}, []);

	const signOut = useCallback(async () => {
		await SecureStore.deleteItemAsync("authState");
		tokenRef.current = null;
		setUser(null);
		router.replace("/login");
	}, []);

	return (
		<AuthContext.Provider
			value={{
				signIn,
				signOut,
				token: tokenRef,
				user,
				isLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
