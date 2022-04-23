import { InferGetStaticPropsType } from "next";
import * as React from "react";
import { Code } from "../../components/Code";
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
        <div className="relative flex items-start">
          <div className="flex h-5 items-center">
            <input
              aria-describedby="clampSelectedValue-description"
              checked={clampSelectedValue}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              id="clampSelectedValue"
              name="clampSelectedValue"
              onChange={() =>
                setClampSelectedValue(
                  (clampSelectedValue) => !clampSelectedValue
                )
              }
              type="checkbox"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="clampSelectedValue" className="font-medium">
              clampSelectedValue
            </label>
            <p id="clampSelectedValue-description">
              When <Code>minValue</Code> and/or <Code>maxValue</Code> are set,
              automatically keep <Code>value</Code> within those values.
            </p>
          </div>
        </div>
      </fieldset>
    </Example>
  );
}

export async function getStaticProps() {
  return {
    props: await fetchFromGitHub("/packages/www/examples/DateTimePicker.tsx"),
  };
}
