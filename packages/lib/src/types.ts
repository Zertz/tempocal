import { Temporal } from "@js-temporal/polyfill";

export type Locale = Exclude<
  Parameters<typeof Intl.DateTimeFormat>[0],
  undefined
>;

export type Value = Temporal.PlainDate | Temporal.PlainDateTime;
