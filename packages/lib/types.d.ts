import { Temporal } from "@js-temporal/polyfill";

export type Locale = Parameters<typeof Intl.DateTimeFormat>[0];

export type Value = Temporal.PlainDate | Temporal.PlainDateTime;
