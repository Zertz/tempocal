import * as React from "react";
import { Code } from "../../components/Code";
import { Example } from "../../components/Example";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { DatePicker } from "../../examples/DatePicker";

export default function ExamplesPage() {
  const [clampCalendarValue, setClampCalendarValue] = React.useState(true);
  const [locale, setLocale] = React.useState<Locale>("en-US");
  const [rollover, setRollover] = React.useState(true);
  const [startOfWeek, setStartOfWeek] = React.useState(7);

  return (
    <Example file="/packages/www/examples/DatePicker.tsx" title="DatePicker">
      <DatePicker
        clampCalendarValue={clampCalendarValue}
        locale={locale}
        rollover={rollover}
        startOfWeek={startOfWeek}
      />
      <fieldset className="flex flex-col gap-2">
        <legend className="sr-only">Props</legend>
        <Select
          id="select-locale"
          label="Locale"
          onChange={({ target: { value } }) => setLocale(value)}
          title="Locale"
          value={locale}
        >
          <option value="en-US">en-US</option>
          <option value="es-ES">es-ES</option>
          <option value="fr-CA">fr-CA</option>
          <option value="pt-BR">pt-BR</option>
          <option value="uk-UA">uk-UA</option>
        </Select>
        <div className="relative flex items-start">
          <div className="flex h-5 items-center">
            <input
              aria-describedby="clampCalendarValue-description"
              checked={clampCalendarValue}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              id="clampCalendarValue"
              name="clampCalendarValue"
              onChange={() =>
                setClampCalendarValue(
                  (clampCalendarValue) => !clampCalendarValue
                )
              }
              type="checkbox"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="clampCalendarValue" className="font-medium">
              clampCalendarValue
            </label>
            <p id="clampCalendarValue-description">
              When <Code>minValue</Code> and/or <Code>maxValue</Code> are set,
              automatically keep <Code>calendarValue</Code> within those values.
            </p>
          </div>
        </div>
        <div className="relative flex items-start">
          <div className="flex h-5 items-center">
            <input
              aria-describedby="rollover-description"
              checked={rollover}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              id="rollover"
              name="rollover"
              onChange={() => setRollover((rollover) => !rollover)}
              type="checkbox"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="rollover" className="font-medium">
              rollover
            </label>
            <p id="rollover-description">
              Fill the calendar with days from the previous and next months.
            </p>
          </div>
        </div>
        <Input
          hint="Monday = 1 and Sunday = 7"
          id="startOfWeek"
          label="Start of week"
          max={7}
          min={1}
          name="startOfWeek"
          onChange={({ target: { value } }) => setStartOfWeek(Number(value))}
          type="number"
          value={startOfWeek}
        />
      </fieldset>
    </Example>
  );
}
