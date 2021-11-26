import { ReactNode } from "react";
import { Locale, Value } from "./types";
import { useMonthStartDate, useTempocal, useWeekdayNames } from "./useTempocal";

export function Calendar({
  locale,
  onChange,
  value,
  dayClassName,
  monthClassName,
  weekdayClassName,
  renderDay = ({ day }) => day,
  renderWeekday = ({ weekdayName }) => weekdayName,
}: Pick<ReturnType<typeof useTempocal>, "onChange"> & {
  locale: Locale;
  value: Value;
  dayClassName?: (day: number) => string;
  monthClassName?: () => string;
  weekdayClassName?: (weekday: number) => string;
  renderDay?: (props: { day: number }) => ReactNode;
  renderWeekday?: (props: {
    weekday: number;
    weekdayName: string;
  }) => ReactNode;
}) {
  const monthStartDate = useMonthStartDate(value);
  const weekdayNames = useWeekdayNames(locale, value.daysInWeek);

  return (
    <ul
      className={monthClassName?.()}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${value.daysInWeek}, minmax(0, 1fr))`,
      }}
    >
      {[...Array(value.daysInWeek)].map((_, weekday) => (
        <li key={weekday} className={weekdayClassName?.(weekday + 1)}>
          {renderWeekday({
            weekday: weekday + 1,
            weekdayName: weekdayNames[weekday],
          })}
        </li>
      ))}
      {[...Array(value.daysInMonth)].map((_, day) => (
        <li
          key={day}
          style={
            day === 0
              ? {
                  gridColumnStart:
                    monthStartDate.dayOfWeek === 7
                      ? 1
                      : monthStartDate.dayOfWeek + 1,
                }
              : undefined
          }
        >
          <button
            className={dayClassName?.(day + 1)}
            onClick={() => onChange({ day: day + 1 })}
            type="button"
          >
            {renderDay({ day: day + 1 })}
          </button>
        </li>
      ))}
    </ul>
  );
}
