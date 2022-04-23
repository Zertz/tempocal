import { InferGetStaticPropsType } from "next";
import * as React from "react";
import { Checkbox } from "../../components/Checkbox";
import { Example } from "../../components/Example";
import { DateTimePicker } from "../../examples/DateTimePicker";
import { fetchFromGitHub } from "../../utils/fetchFromGitHub";

export default function ExamplesPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const [clampSelectedValue, setClampSelectedValue] = React.useState(true);

  return (
    <Example
      demo={<DateTimePicker clampSelectedValue={clampSelectedValue} />}
      title="DateTimePicker"
      {...props}
    >
      <fieldset className="flex flex-col gap-2">
        <legend className="sr-only">Props</legend>
        <Checkbox
          checked={clampSelectedValue}
          hint="When minValue and/or maxValue are set, automatically keep the selected value within those values."
          id="clampSelectedValue"
          label="clampSelectedValue"
          name="clampSelectedValue"
          onChange={() => {
            setClampSelectedValue((clampSelectedValue) => !clampSelectedValue);
          }}
        />
      </fieldset>
    </Example>
  );
}

export async function getStaticProps() {
  return {
    props: await fetchFromGitHub("/packages/www/examples/DateTimePicker.tsx"),
  };
}
