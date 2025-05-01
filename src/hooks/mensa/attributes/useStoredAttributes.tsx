import { useAsyncStorage } from "../../useAsyncStorage";
import { useCallback, useEffect, useState } from "react";

export function useStoredAttributes() {
	const [attributes, setAttributes] = useState<string[]>([]);
	const { getItem, setItem } = useAsyncStorage<string[]>("attributes");

	const load = useCallback(async () => {
		const stored = await getItem();
		if (stored) setAttributes(stored);
	}, [getItem]);

	const update = useCallback((newAttributes: string[]) => {
		setAttributes(newAttributes);
	}, []);

	const save = () => {
		void setItem(attributes);
	};

	const clear = () => {
		setAttributes([]);
	};

	useEffect(() => {
		void load();
	}, [load]);

	return { attributes, reload: load, update, save, clear };
}
