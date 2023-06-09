import dayjs from "dayjs";
import localeEn from "dayjs/locale/en";
import relativeTimePlugin from "dayjs/plugin/relativeTime";
import timezonePlugin from "dayjs/plugin/timezone";

dayjs.extend(relativeTimePlugin).locale(localeEn);
dayjs.extend(timezonePlugin).locale(localeEn);

export const timeAgo = (date: string): string => {
  return dayjs(date).isBefore(dayjs(new Date()))
    ? dayjs(date).fromNow()
    : dayjs(date).toNow();
};
