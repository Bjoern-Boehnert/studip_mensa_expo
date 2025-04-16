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

const AuthContext = createContext<{
	signIn: (arg0: string) => void;
	signOut: () => void;
	token: MutableRefObject<string | null> | null;
	isLoading: boolean;
}>({
	signIn: () => null,
	signOut: () => null,
	token: null,
	isLoading: true,
});

export function useAuthSession() {
	return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: ReactNode }): ReactNode {
	const tokenRef = useRef<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(async (): Promise<void> => {
			const token = await SecureStore.getItemAsync("token");
			tokenRef.current = token || "";
			setIsLoading(false);
		})();
	}, []);

	const signIn = useCallback(async (token: string) => {
		await SecureStore.setItemAsync("token", token);
		tokenRef.current = token;
		router.replace("/");
	}, []);

	const signOut = useCallback(async () => {
		await SecureStore.deleteItemAsync("token");
		tokenRef.current = null;
		router.replace("/login");
	}, []);

	return (
		<AuthContext.Provider
			value={{
				signIn,
				signOut,
				token: tokenRef,
				isLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
