import { Temporal } from "@js-temporal/polyfill";
import { ReactNode } from "react";
import { Locale, Value } from "./types";
import {
  useCalendarMonthDateRange,
  useMonthStartDate,
  useTempocal,
  useWeekdayNames,
} from "./useTempocal";

export function Calendar({
  className,
  locale,
  onSelect,
  value,
  dayClassName,
  weekdayClassName,
  renderDay = ({ day }) => day,
  renderWeekday = ({ weekdayName }) => weekdayName,
  rollover,
}: Pick<ReturnType<typeof useTempocal>, "onSelect"> & {
  className?: string;
  locale: Locale;
  value: Value;
  dayClassName?: (date: Temporal.PlainDate) => string;
  weekdayClassName?: (props: {
    weekday: number;
    weekdayName: string;
  }) => string;
  renderDay?: (date: Temporal.PlainDate) => ReactNode;
  renderWeekday?: (props: {
    weekday: number;
    weekdayName: string;
  }) => ReactNode;
  rollover?: boolean;
}) {
  const { start, end } = useCalendarMonthDateRange(value, rollover);
  const monthStartDate = useMonthStartDate(value);
  const weekdayNames = useWeekdayNames(locale, value.daysInWeek);

  return (
    <ul
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${value.daysInWeek}, minmax(0, 1fr))`,
      }}
    >
      {weekdayNames.map((weekdayName, weekday) => {
        const props = {
          weekday: weekday + 1,
          weekdayName,
        };

        return (
          <li key={weekday} className={weekdayClassName?.(props)}>
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
              className={dayClassName?.(date)}
              onClick={() => onSelect(date)}
              type="button"
            >
              {renderDay(date)}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
