import { Temporal } from "@js-temporal/polyfill";
import { useTempocal } from "@tempocal/react";
import { InferGetStaticPropsType } from "next";
import * as React from "react";
import { Example } from "../../components/Example";
import { CalendarHeader } from "../../recipes/CalendarHeader";
import { fetchFromGitHub } from "../../utils/fetchFromGitHub";

export default function RecipesPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Example demo={<Recipe />} title="CalendarHeader" {...props}>
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

export async function getStaticProps() {
  return {
    props: await fetchFromGitHub("/packages/www/recipes/CalendarHeader.tsx"),
  };
}
