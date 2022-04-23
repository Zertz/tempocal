import { Locale } from "@tempocal/react";
import { InferGetStaticPropsType } from "next";
import * as React from "react";
import { Checkbox } from "../../components/Checkbox";
import { Example } from "../../components/Example";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { DatePicker } from "../../examples/DatePicker";
import { fetchFromGitHub } from "../../utils/fetchFromGitHub";

export default function DatePickerPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const [clampCalendarValue, setClampCalendarValue] = React.useState(true);
  const [locale, setLocale] = React.useState<Locale>("en-US");
  const [rollover, setRollover] = React.useState(true);
  const [startOfWeek, setStartOfWeek] = React.useState(7);

  return (
    <Example
      demo={
        <DatePicker
          clampCalendarValue={clampCalendarValue}
          locale={locale}
          rollover={rollover}
          startOfWeek={startOfWeek}
        />
      }
      title="DatePicker"
      {...props}
    >
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
        <Checkbox
          checked={clampCalendarValue}
          hint="When minValue and/or maxValue are set, automatically keep the calendar value within those values."
          id="clampCalendarValue"
          label="clampCalendarValue"
          name="clampCalendarValue"
          onChange={() => {
            setClampCalendarValue((clampCalendarValue) => !clampCalendarValue);
          }}
        />
        <Checkbox
          checked={rollover}
          hint="Fill month grid with days from the previous and next months."
          id="rollover"
          label="rollover"
          name="rollover"
          onChange={() => setRollover((rollover) => !rollover)}
        />
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

export async function getStaticProps() {
  return {
    props: await fetchFromGitHub("/packages/www/examples/DatePicker.tsx"),
  };
}
