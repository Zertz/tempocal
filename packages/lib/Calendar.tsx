import { Temporal } from "@js-temporal/polyfill";
import { Locale, Value } from "./types";
import {
  useCalendarMonthDateRange,
  useMonthStartDate,
  useTempocal,
  useWeekdayNames,
} from "./useTempocal";

type MonthProps = Pick<ReturnType<typeof useTempocal>, "onSelect"> & {
  locale: Locale;
  rollover?: boolean;
  value: Value;
  monthProps?: () => Omit<
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
};

export function Calendar({
  locale,
  monthsBefore = 0,
  monthsAfter = 0,
  rollover = false,
  value,
  onSelect,
  monthProps,
  headerProps,
  renderHeader,
  weekdayProps,
  renderWeekday = ({ weekdayName }) => weekdayName,
  dayProps,
  renderDay = ({ day }) => day,
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
          onSelect={onSelect}
          monthProps={monthProps}
          headerProps={headerProps}
          renderHeader={renderHeader}
          weekdayProps={weekdayProps}
          renderWeekday={renderWeekday}
          dayProps={dayProps}
          renderDay={renderDay}
        />
      ))}
    </>
  );
}

function Month({
  locale,
  rollover = false,
  value,
  onSelect,
  monthProps,
  headerProps,
  renderHeader,
  weekdayProps,
  renderWeekday = ({ weekdayName }) => weekdayName,
  dayProps,
  renderDay = ({ day }) => day,
}: MonthProps) {
  const { start, end } = useCalendarMonthDateRange(value, rollover);
  const monthStartDate = useMonthStartDate(value);
  const weekdayNames = useWeekdayNames(locale, value.daysInWeek);

  return (
    <ul
      {...monthProps?.()}
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
          <li
            key={day}
            style={
              day === 0
                ? {
                    gridColumnStart: rollover ? 1 : monthStartDate.dayOfWeek,
                  }
                : undefined
            }
          >
            <button
              onClick={() => onSelect(date)}
              type="button"
              {...dayProps?.(date)}
            >
              {renderDay(date)}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
