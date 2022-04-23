import * as React from "react";
import { Example } from "../../components/Example";
import { Input } from "../../components/Input";
import { DateRangePicker } from "../../examples/DateRangePicker";

export default function ExamplesPage() {
  const [monthsBefore, setMonthsBefore] = React.useState(0);
  const [monthsAfter, setMonthsAfter] = React.useState(0);

  return (
    <Example
      demo={
        <DateRangePicker
          monthsAfter={monthsAfter}
          monthsBefore={monthsBefore}
        />
      }
      file="/packages/www/examples/DateRangePicker.tsx"
      title="DateRangePicker"
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
      </fieldset>
    </Example>
  );
}
