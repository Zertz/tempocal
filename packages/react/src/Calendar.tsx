import { Temporal } from "@js-temporal/polyfill";
import {
  getCalendarMonthDateRange,
  getMonthStartDate,
  getWeekdays,
} from "@tempocal/core";
import * as React from "react";
import { Locale, Value } from "./types";

type MonthProps = {
  locale: Locale;
  maxValue?: Temporal.PlainDate | undefined;
  minValue?: Temporal.PlainDate | undefined;
  rollover?: boolean;
  value: Value;
  calendarProps?: () => Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLUListElement>,
      HTMLUListElement
    >,
    "style"
  >;
  headerProps?: (
    date: Temporal.PlainDate
  ) => Omit<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLLIElement>, HTMLLIElement>,
    "style"
  >;
  renderHeader?: (date: Temporal.PlainDate) => React.ReactNode;
  weekdayProps?: (props: {
    weekday: number;
    longName: string;
    shortName: string;
    narrowName: string;
  }) => React.DetailedHTMLProps<
    React.LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement
  >;
  renderWeekday?: (props: {
    weekday: number;
    longName: string;
    shortName: string;
    narrowName: string;
  }) => React.ReactNode;
  dayProps?: (
    date: Temporal.PlainDate
  ) => React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLLIElement>,
    HTMLLIElement
  >;
  renderDay?: (props: {
    date: Temporal.PlainDate;
    disabled: boolean;
    plainDateLike: Temporal.PlainDateLike;
  }) => React.ReactNode;
  footerProps?: (
    date: Temporal.PlainDate
  ) => Omit<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLLIElement>, HTMLLIElement>,
    "style"
  >;
  renderFooter?: (date: Temporal.PlainDate) => React.ReactNode;
};

function useCalendarMonthDateRange(value: Value, rollover: boolean) {
  return React.useMemo(
    () => getCalendarMonthDateRange(value, rollover),
    [rollover, value]
  );
}

function useMonthStartDate(value: Value) {
  return React.useMemo(() => getMonthStartDate(value), [value]);
}

function useWeekdays(
  locale: Parameters<typeof Intl.DateTimeFormat>[0],
  daysInWeek: number
) {
  return React.useMemo(
    () => getWeekdays(locale, daysInWeek),
    [daysInWeek, locale]
  );
}

export function Calendar({
  locale,
  maxValue,
  minValue,
  monthsBefore = 0,
  monthsAfter = 0,
  rollover,
  value,
  calendarProps,
  headerProps,
  renderHeader,
  weekdayProps,
  renderWeekday,
  dayProps,
  renderDay,
  footerProps,
  renderFooter,
}: MonthProps & {
  monthsBefore?: number;
  monthsAfter?: number;
}) {
  const months = React.useMemo(
    () => [...Array(monthsBefore + 1 + monthsAfter)],
    [monthsAfter, monthsBefore]
  );

  return (
    <>
      {months.map((_, month) => (
        <Month
          key={month}
          locale={locale}
          maxValue={maxValue}
          minValue={minValue}
          rollover={rollover}
          value={value.add({ months: month - monthsBefore })}
          calendarProps={calendarProps}
          headerProps={headerProps}
          renderHeader={renderHeader}
          weekdayProps={weekdayProps}
          renderWeekday={renderWeekday}
          dayProps={dayProps}
          renderDay={renderDay}
          footerProps={footerProps}
          renderFooter={renderFooter}
        />
      ))}
    </>
  );
}

function Month({
  locale,
  maxValue,
  minValue,
  rollover = false,
  value,
  calendarProps,
  headerProps,
  renderHeader,
  weekdayProps,
  renderWeekday,
  dayProps,
  renderDay,
  footerProps,
  renderFooter,
}: MonthProps) {
  const { start, end } = useCalendarMonthDateRange(value, rollover);
  const monthStartDate = useMonthStartDate(value);
  const weekdays = useWeekdays(locale, value.daysInWeek);

  const days = React.useMemo(
    () =>
      [...Array(start.until(end).days + 1)].map((_, day) =>
        start.add({ days: day })
      ),
    [end, start]
  );

  return (
    <ul
      {...calendarProps?.()}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${value.daysInWeek}, minmax(0, 1fr))`,
      }}
    >
      {renderHeader && (
        <li
          {...headerProps?.(monthStartDate)}
          style={{
            gridColumn: `span ${value.daysInWeek} / span ${value.daysInWeek}`,
          }}
        >
          {renderHeader(monthStartDate)}
        </li>
      )}
      {weekdays.map((weekday) => (
        <li key={weekday.weekday} {...weekdayProps?.(weekday)}>
          {renderWeekday ? renderWeekday(weekday) : weekday.shortName}
        </li>
      ))}
      {days.map((date, day) => (
        <Day
          key={date.dayOfYear}
          date={date}
          day={day}
          disabled={
            (!!minValue && Temporal.PlainDate.compare(date, minValue) < 0) ||
            (!!maxValue && Temporal.PlainDate.compare(date, maxValue) > 0)
          }
          dayProps={dayProps}
          renderDay={renderDay}
          rollover={rollover}
        />
      ))}
      {renderFooter && (
        <li
          {...footerProps?.(monthStartDate)}
          style={{
            gridColumn: `span ${value.daysInWeek} / span ${value.daysInWeek}`,
          }}
        >
          {renderFooter(monthStartDate)}
        </li>
      )}
    </ul>
  );
}

function Day({
  date,
  day,
  disabled,
  dayProps,
  renderDay,
  rollover = false,
}: Pick<MonthProps, "dayProps" | "renderDay" | "rollover"> & {
  date: Temporal.PlainDate;
  day: number;
  disabled: boolean;
}) {
  const props = React.useMemo(() => {
    const plainDateLike: Temporal.PlainDateLike = {
      year: date.year,
      month: date.month,
      monthCode: date.monthCode,
      day: date.day,
    };

    return {
      date,
      disabled,
      plainDateLike,
    };
  }, [date, disabled]);

  return (
    <li
      {...dayProps?.(date)}
      style={
        !rollover && day === 0
          ? {
              gridColumnStart: date.dayOfWeek === 7 ? 1 : date.dayOfWeek + 1,
            }
          : undefined
      }
    >
      {renderDay ? renderDay(props) : date.day}
    </li>
  );
}
