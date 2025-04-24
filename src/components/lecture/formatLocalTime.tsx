import { formatInTimeZone } from "date-fns-tz";
import { de } from "date-fns/locale";

export const formatLocalTime = (unixTimestamp: number, formatStr: string): string => {
	return formatInTimeZone(unixTimestamp * 1000, "Europe/Berlin", formatStr, {
		locale: de,
	});
};
