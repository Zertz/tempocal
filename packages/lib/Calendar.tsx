import { Temporal } from "@js-temporal/polyfill";
import * as React from "react";
import { Locale, Value } from "./types";
import {
  useCalendarMonthDateRange,
  useMonthStartDate,
  useWeekdayNames,
} from "./useTempocal";

type MonthProps = {
  locale: Locale;
  rollover?: boolean;
  value: Value;
  onChange: (params: Temporal.PlainDate | Temporal.PlainDateLike) => void;
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
    weekdayName: string;
  }) => React.DetailedHTMLProps<
    React.LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement
  >;
  renderWeekday?: (props: {
    weekday: number;
    weekdayName: string;
  }) => React.ReactNode;
  dayProps?: (
    date: Temporal.PlainDate
  ) => React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  renderDay?: (date: Temporal.PlainDate) => React.ReactNode;
  footerProps?: (
    date: Temporal.PlainDate
  ) => Omit<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLLIElement>, HTMLLIElement>,
    "style"
  >;
  renderFooter?: (date: Temporal.PlainDate) => React.ReactNode;
};

export function Calendar({
  locale,
  monthsBefore = 0,
  monthsAfter = 0,
  rollover = false,
  value,
  onChange,
  calendarProps,
  headerProps,
  renderHeader,
  weekdayProps,
  renderWeekday = ({ weekdayName }) => weekdayName,
  dayProps,
  renderDay = ({ day }) => day,
  footerProps,
  renderFooter,
}: MonthProps & {
  monthsBefore?: number;
  monthsAfter?: number;
}) {
  return (
    <>
      {[...Array(monthsBefore + 1 + monthsAfter)].map((_, month) => (
        <Month
          key={month}
          locale={locale}
          rollover={rollover}
          value={value.add({ months: month - monthsBefore })}
          onChange={onChange}
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
  rollover = false,
  value,
  onChange,
  calendarProps,
  headerProps,
  renderHeader,
  weekdayProps,
  renderWeekday = ({ weekdayName }) => weekdayName,
  dayProps,
  renderDay,
  footerProps,
  renderFooter,
}: MonthProps) {
  const { start, end } = useCalendarMonthDateRange(value, rollover);
  const monthStartDate = useMonthStartDate(value);
  const weekdayNames = useWeekdayNames(locale, value.daysInWeek);

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
      {weekdayNames.map((weekdayName, weekday) => {
        const props = {
          weekday: weekday + 1,
          weekdayName,
        };

        return (
          <li key={weekday} {...weekdayProps?.(props)}>
            {renderWeekday(props)}
          </li>
        );
      })}
      {[...Array(start.until(end).days + 1)].map((_, day) => {
        const date = start.add({ days: day });

        return (
          <Day
            key={date.dayOfYear}
            date={date}
            day={day}
            onChange={onChange}
            dayProps={dayProps}
            renderDay={renderDay}
            rollover={rollover}
          />
        );
      })}
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
  onChange,
  dayProps,
  renderDay = ({ day }) => day,
  rollover,
}: Pick<MonthProps, "onChange" | "dayProps" | "renderDay" | "rollover"> & {
  date: Temporal.PlainDate;
  day: number;
}) {
  return (
    <li
      style={
        !rollover && day === 0
          ? {
              gridColumnStart: date.dayOfWeek === 7 ? 1 : date.dayOfWeek + 1,
            }
          : undefined
      }
    >
      <button
        onClick={() => {
          const params: Temporal.PlainDateLike = {
            year: date.year,
            month: date.month,
            monthCode: date.monthCode,
            day: date.day,
          };

          onChange(params);
        }}
        type="button"
        {...dayProps?.(date)}
      >
        {renderDay(date)}
      </button>
    </li>
  );
}
