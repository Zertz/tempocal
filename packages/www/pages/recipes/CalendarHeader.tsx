import { Temporal } from "@js-temporal/polyfill";
import { Example } from "../../components/Example";
import { CalendarHeader } from "../../recipes/CalendarHeader";

export default function RecipesPage() {
  return (
    <Example
      file="/packages/www/recipes/CalendarHeader.tsx"
      title="CalendarHeader"
    >
      <CalendarHeader
        calendarValue={Temporal.Now.plainDate("iso8601")}
        months={[]}
        onChangeCalendarValue={() => Temporal.Now.plainDate("iso8601")}
        years={[]}
      />
    </Example>
  );
}
