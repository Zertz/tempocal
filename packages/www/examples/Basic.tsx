import { Calendar, useTempocal, useTemporalState } from "@tempocal/react";

export function Basic() {
  const [value, setValue] = useTemporalState("date", {
    year: 2021,
    month: 11,
    day: 25,
  });

  const { calendarProps } = useTempocal({
    locale: "en-US",
    mode: "date",
    setValue,
    value,
  });

  return (
    <Calendar
      {...calendarProps}
      calendarProps={() => ({
        className: "gap-1 text-center w-72",
      })}
    />
  );
}
