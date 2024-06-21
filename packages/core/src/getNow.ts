import { Temporal } from "@js-temporal/polyfill";

export function getNow(calendar: Temporal.CalendarLike = "iso8601") {
  return Temporal.Now.plainDateTime(calendar);
}
