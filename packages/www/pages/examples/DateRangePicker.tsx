import { InferGetStaticPropsType } from "next";
import * as React from "react";
import { Checkbox } from "../../components/Checkbox";
import { Example } from "../../components/Example";
import { Input } from "../../components/Input";
import { DateRangePicker } from "../../examples/DateRangePicker";
import { fetchFromGitHub } from "../../utils/fetchFromGitHub";

export default function DateRangePickerPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const [monthsBefore, setMonthsBefore] = React.useState(0);
  const [monthsAfter, setMonthsAfter] = React.useState(0);

  const [normalizeRenderedWeeks, setNormalizeRenderedWeeks] =
    React.useState(true);

  return (
    <Example
      demo={
        <DateRangePicker
          monthsAfter={monthsAfter}
          monthsBefore={monthsBefore}
          normalizeRenderedWeeks={normalizeRenderedWeeks}
        />
      }
      title="DateRangePicker"
      {...props}
    >
      <fieldset className="flex flex-col gap-2">
        <legend className="sr-only">Props</legend>
        <Input
          hint="Number of months to show before the primary calendar"
          id="monthsBefore"
          label="Months before"
          min={0}
          name="monthsBefore"
          onChange={({ target: { value } }) => setMonthsBefore(Number(value))}
          type="number"
          value={monthsBefore}
        />
        <Input
          hint="Number of months to show after the primary calendar"
          id="monthsAfter"
          label="Months after"
          min={0}
          name="monthsAfter"
          onChange={({ target: { value } }) => setMonthsAfter(Number(value))}
          type="number"
          value={monthsAfter}
        />
        <Checkbox
          checked={normalizeRenderedWeeks}
          hint="Always render the calendar with the same number of weeks, as if it were a paper calendar."
          id="normalizeRenderedWeeks"
          label="normalizeRenderedWeeks"
          name="normalizeRenderedWeeks"
          onChange={() => {
            setNormalizeRenderedWeeks(
              (normalizeRenderedWeeks) => !normalizeRenderedWeeks
            );
          }}
        />
      </fieldset>
    </Example>
  );
}

export async function getStaticProps() {
  return {
    props: await fetchFromGitHub("/packages/www/examples/DateRangePicker.tsx"),
  };
}
