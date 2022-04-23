import { Temporal } from "@js-temporal/polyfill";
import { useTempocal } from "@tempocal/react";
import * as React from "react";
import { Example } from "../../components/Example";
import { CalendarHeader } from "../../recipes/CalendarHeader";

export default function RecipesPage() {
  return (
    <Example
      demo={<Recipe />}
      file="/packages/www/recipes/CalendarHeader.tsx"
      title="CalendarHeader"
    >
      👀
    </Example>
  );
}

function Recipe() {
  const [value, setValue] = React.useState(Temporal.Now.plainDate("iso8601"));

  const [maxValue] = React.useState(value.add({ years: 3 }));
  const [minValue] = React.useState(value.subtract({ years: 3 }));

  const { calendarValue, months, years, onChangeCalendarValue } = useTempocal({
    locale: "en-US",
    maxValue,
    minValue,
    mode: "date",
    setValue,
    value,
  });

  return (
    <div className="flex items-center gap-2">
      <CalendarHeader
        calendarValue={calendarValue}
        months={months}
        onChangeCalendarValue={onChangeCalendarValue}
        years={years}
      />
    </div>
  );
}
