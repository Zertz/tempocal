import { ClampMode } from "@tempocal/react/dist/tempocal-react";
import { InferGetStaticPropsType } from "next";
import * as React from "react";
import { Checkbox } from "../../components/Checkbox";
import { Example } from "../../components/Example";
import { DateTimePicker } from "../../examples/DateTimePicker";
import { fetchFromGitHub } from "../../utils/fetchFromGitHub";

export default function DateTimePickerPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const [clampSelectedValue, setClampSelectedValue] =
    React.useState<ClampMode>("always");

  return (
    <Example
      demo={<DateTimePicker clampSelectedValue={clampSelectedValue} />}
      title="DateTimePicker"
      {...props}
    >
      <fieldset className="flex flex-col gap-2">
        <legend className="sr-only">Props</legend>
        <Checkbox
          checked={clampSelectedValue === "always"}
          hint="When minValue and/or maxValue are set, automatically keep the selected value within those values."
          id="clampSelectedValue"
          label="clampSelectedValue"
          name="clampSelectedValue"
          onChange={() => {
            setClampSelectedValue((clampSelectedValue) =>
              clampSelectedValue === "always" ? "never" : "always"
            );
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
