import { format, fromUnixTime } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { de } from "date-fns/locale";

export const getEuropeDate = (unix: number) => {
	const date = fromUnixTime(unix);
	return toZonedTime(date, "Europe/Berlin");
};

export const formatDate = (date: Date, formatString: string) => {
	return format(date, formatString, {locale: de});
};