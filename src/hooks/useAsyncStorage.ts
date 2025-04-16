import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';

export function useAsyncStorage<T = string>(key: string) {
	const setItem = useCallback(async (value: T) => {
		try {
			const jsonValue = JSON.stringify(value);
			await AsyncStorage.setItem(key, jsonValue);
		} catch (e) {
		}
	}, [key]);

	const getItem = useCallback(async (): Promise<T | null> => {
		try {
			const jsonValue = await AsyncStorage.getItem(key);
			return jsonValue != null ? JSON.parse(jsonValue) : null;
		} catch (e) {
			return null;
		}
	}, [key]);

	const removeItem = useCallback(async () => {
		try {
			await AsyncStorage.removeItem(key);
		} catch (e) {
		}
	}, [key]);

	return { setItem, getItem, removeItem };
}
