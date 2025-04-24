import { useAsyncStorage } from "./useAsyncStorage";
import { useCallback, useEffect, useState } from "react";

export function useStoredAttributes() {
	const [attributes, setAttributes] = useState<string[]>([]);
	const { getItem } = useAsyncStorage<string[]>("attributes");

	const loadAttributes = useCallback(async () => {
		const stored = await getItem();
		if (stored) setAttributes(stored);
	}, [getItem]);

	useEffect(() => {
		void loadAttributes();
	}, [loadAttributes]);

	return { attributes, reloadAttributes: loadAttributes };
}
