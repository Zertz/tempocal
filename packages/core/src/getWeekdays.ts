import { getFirstDayOfWeek } from "./getFirstDayOfWeek";
import { getNow } from "./getNow";
import { temporalToDate } from "./temporalToDate";

export function getWeekdays(locale: Intl.LocalesArgument, startOfWeek: number) {
  const firstDayOfWeek = getFirstDayOfWeek(getNow(), startOfWeek);

  const longWeekdayFormatter = new Intl.DateTimeFormat(locale, {
    weekday: "long",
  });

  const shortWeekdayFormatter = new Intl.DateTimeFormat(locale, {
    weekday: "short",
  });

  const narrowWeekdayFormatter = new Intl.DateTimeFormat(locale, {
    weekday: "narrow",
  });

  const weekdays: {
    dayOfWeek: number;
    longName: string;
    shortName: string;
    narrowName: string;
  }[] = [];

  for (let i = 0; i < firstDayOfWeek.daysInWeek; i += 1) {
    const value = firstDayOfWeek.add({ days: i });
    const date = temporalToDate(value);

    weekdays.push({
      dayOfWeek: value.dayOfWeek,
      longName: longWeekdayFormatter.format(date),
      shortName: shortWeekdayFormatter.format(date),
      narrowName: narrowWeekdayFormatter.format(date),
    });
  }

  return weekdays;
}
