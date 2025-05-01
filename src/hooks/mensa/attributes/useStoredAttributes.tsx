import { useAsyncStorage } from "../../useAsyncStorage";
import { useCallback, useEffect, useState } from "react";
import { Attribute } from "@/src/types/types";

type Attributes = [string, Attribute][];
export function useStoredAttributes() {
	const [attributes, setAttributes] = useState<Attributes>([]);
	const { getItem, setItem } = useAsyncStorage<Attributes>("attributes");

	const load = useCallback(async () => {
		const stored = await getItem();
		if (stored) setAttributes(stored);
	}, [getItem]);

	const update = useCallback((newAttributes: Attributes) => {
		setAttributes(newAttributes);
	}, []);

	const save = () => {
		void setItem(attributes);
	};

	const clear = () => {
		setAttributes([]);
		void setItem([]);
	};

	useEffect(() => {
		void load();
	}, [load]);

	return { attributes, reload: load, update, save, clear };
}
