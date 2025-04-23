import { useAuthentication } from "../../providers/AuthProvider";

export function useAuthenticatedSession() {
	const { user, token, isLoading } = useAuthentication();

	if (isLoading) {
		throw new Error("useAuthenticatedSession() used while auth is still loading");
	}

	if (!user || !token || token.current === null) {
		throw new Error("No authenticated session found. This hook must only be used in protected routes.");
	}

	return { user, token: token.current };
}
