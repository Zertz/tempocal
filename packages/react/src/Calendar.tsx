import { Temporal } from "@js-temporal/polyfill";
import {
  getCalendarMonthDateRange,
  getMonthStartDate,
  getWeekdays,
} from "@tempocal/core";
import * as React from "react";
import { CSSProperties } from "react";
import { Locale } from "./useTempocal";

type Value = Temporal.PlainDate | Temporal.PlainDateTime;

type MonthProps = {
  locale: Locale;
  maxValue?: Temporal.PlainDate | undefined;
  minValue?: Temporal.PlainDate | undefined;
  monthsFixedGrid?: boolean;
  rollover?: boolean;
  startOfWeek?: number;
  value: Value;
  calendarProps?: () => Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLUListElement>,
      HTMLUListElement
    >,
    "style"
  >;
  headerProps?: (props: {
    date: Temporal.PlainDate;
  }) => Omit<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLLIElement>, HTMLLIElement>,
    "style"
  >;
  renderHeader?: (props: { date: Temporal.PlainDate }) => React.ReactNode;
  weekdayProps?: (props: {
    dayOfWeek: number;
    longName: string;
    shortName: string;
    narrowName: string;
  }) => React.DetailedHTMLProps<
    React.LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement
  >;
  renderWeekday?: (props: {
    dayOfWeek: number;
    longName: string;
    shortName: string;
    narrowName: string;
  }) => React.ReactNode;
  dayProps?: (props: {
    date: Temporal.PlainDate;
    disabled: boolean;
    plainDateLike: Temporal.PlainDateLike;
  }) => Omit<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLLIElement>,
      HTMLLIElement
    >,
    "style"
  >;
  renderDay?: (props: {
    date: Temporal.PlainDate;
    disabled: boolean;
    plainDateLike: Temporal.PlainDateLike;
  }) => React.ReactNode;
  footerProps?: (props: {
    date: Temporal.PlainDate;
  }) => Omit<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLLIElement>, HTMLLIElement>,
    "style"
  >;
  renderFooter?: (props: { date: Temporal.PlainDate }) => React.ReactNode;
};

export function Calendar({
  locale,
  maxValue,
  minValue,
  monthsAfter = 0,
  monthsBefore = 0,
  monthsFixedGrid,
  rollover,
  startOfWeek,
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
    () => [...Array(Math.max(0, monthsBefore) + 1 + Math.max(0, monthsAfter))],
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
          monthsFixedGrid={monthsFixedGrid}
          rollover={rollover}
          startOfWeek={startOfWeek}
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
  monthsFixedGrid = false,
  rollover = false,
  startOfWeek = 7,
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
  const { start, end } = React.useMemo(
    () => getCalendarMonthDateRange(value, rollover, startOfWeek),
    [rollover, startOfWeek, value]
  );

  const monthStartDate = React.useMemo(() => getMonthStartDate(value), [value]);

  const weekdays = React.useMemo(
    () => getWeekdays(locale, startOfWeek),
    [locale, startOfWeek]
  );

  const days = React.useMemo(
    () =>
      [...Array(start.until(end).days + 1)].map((_, day) =>
        start.add({ days: day })
      ),
    [end, start]
  );

  const firstDay = days.at(0);

  const gridColumnStart =
    !rollover && firstDay
      ? startOfWeek > firstDay.dayOfWeek
        ? firstDay.daysInWeek - (startOfWeek - firstDay.dayOfWeek) + 1
        : Math.abs(startOfWeek - firstDay.dayOfWeek) + 1
      : undefined;

  const daysToPadAfter = monthsFixedGrid
    ? start.daysInWeek * 6 - start.daysInMonth - (gridColumnStart || 0) + 1
    : 0;

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
          {...headerProps?.({ date: monthStartDate })}
          style={{
            gridColumn: `span ${value.daysInWeek} / span ${value.daysInWeek}`,
          }}
        >
          {renderHeader({ date: monthStartDate })}
        </li>
      )}
      {weekdays.map((weekday) => (
        <li key={weekday.dayOfWeek} {...weekdayProps?.(weekday)}>
          {renderWeekday ? renderWeekday(weekday) : weekday.shortName}
        </li>
      ))}
      {days.map((date, day) => (
        <Day
          key={date.dayOfYear}
          date={date}
          disabled={
            (!!minValue && Temporal.PlainDate.compare(date, minValue) < 0) ||
            (!!maxValue && Temporal.PlainDate.compare(date, maxValue) > 0)
          }
          dayProps={dayProps}
          style={day === 0 ? { gridColumnStart } : undefined}
          renderDay={renderDay}
        />
      ))}
      {daysToPadAfter > 0 && firstDay && (
        <>
          {[...Array(Math.floor(daysToPadAfter / firstDay.daysInWeek))].map(
            (_, index) => (
              <Day
                key={index}
                date={firstDay}
                disabled
                dayProps={dayProps}
                style={{
                  gridColumn: `span ${Math.min(
                    daysToPadAfter,
                    firstDay.daysInWeek
                  )}`,
                  opacity: daysToPadAfter,
                  visibility: "hidden",
                }}
                renderDay={renderDay}
              />
            )
          )}
        </>
      )}
      {renderFooter && (
        <li
          {...footerProps?.({ date: monthStartDate })}
          style={{
            gridColumn: `span ${value.daysInWeek} / span ${value.daysInWeek}`,
          }}
        >
          {renderFooter({ date: monthStartDate })}
        </li>
      )}
    </ul>
  );
}

function Day({
  date,
  disabled,
  dayProps,
  renderDay,
  style,
}: Pick<MonthProps, "dayProps" | "renderDay"> & {
  date: Temporal.PlainDate;
  disabled: boolean;
  style: CSSProperties | undefined;
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
    <li {...dayProps?.(props)} style={style}>
      {renderDay ? renderDay(props) : date.day}
    </li>
  );
}
