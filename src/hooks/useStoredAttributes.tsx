import { useAsyncStorage } from "./useAsyncStorage";
import { useEffect, useState } from "react";

export function useStoredAttributes() {
	const [attributes, setAttributes] = useState<string[]>([]);
	const { getItem } = useAsyncStorage<string[]>("attributes");

	useEffect(() => {
		const load = async () => {
			const attributes = await getItem();
			if (attributes) setAttributes(attributes);
		};
		void load();
	}, [getItem]);

	return attributes;
}
