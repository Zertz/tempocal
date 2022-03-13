import { toTemporalInstant } from "@js-temporal/polyfill";
import * as React from "react";
import { TabPanel, useTabs } from "react-headless-tabs";
import { Locale } from "../lib";
import { Documentation } from "./Documentation";
import { Examples } from "./Examples";
import { Overview } from "./Overview";
import { Select } from "./Select";

const baseClassName =
  "inline-flex items-center border-b-2 cursor-pointer mr-8 px-2 py-4 font-medium text-sm whitespace-nowrap focus:outline-none focus:border-gray-300 focus:text-gray-400";
const activeClassName = "border-gray-50 text-gray-50";
const inactiveClassName =
  "border-transparent hover:border-gray-300 text-gray-200 hover:text-gray-300";

// @ts-expect-error Yes.
Date.prototype.toTemporalInstant = toTemporalInstant;

export function App() {
  const [locale, setLocale] = React.useState<Locale>("en-US");

  const defaultTab = React.useMemo(() => {
    if (typeof window === "undefined" || !window.location.hash) {
      return;
    }

    return window.location.hash.substring(1);
  }, []);

  const [selectedTab, setSelectedTab] = useTabs(
    ["overview", "documentation", "examples"],
    defaultTab
  );

  React.useEffect(() => {
    if (!selectedTab) {
      return;
    }

    window.location.hash = selectedTab;
  }, [selectedTab]);

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-700 text-gray-200">
      <main className="mx-auto w-full max-w-4xl p-2">
        <div className="pb-8 text-center">
          <h1 className="mb-2 text-4xl font-extrabold sm:text-6xl md:text-7xl">
            Tempocal
          </h1>
          <a
            className="text-xl font-light underline transition-colors hover:text-gray-300"
            href="https://github.com/Zertz/tempocal"
          >
            Contribute on GitHub
          </a>
        </div>
        <nav className="flex items-center overflow-x-auto border-b border-gray-400">
          <button
            className={`${baseClassName} ${
              selectedTab === "overview" ? activeClassName : inactiveClassName
            }`}
            onClick={() => setSelectedTab("overview")}
          >
            Overview
          </button>
          <button
            className={`${baseClassName} ${
              selectedTab === "documentation"
                ? activeClassName
                : inactiveClassName
            }`}
            onClick={() => setSelectedTab("documentation")}
          >
            Documentation
          </button>
          <button
            className={`${baseClassName} ${
              selectedTab === "examples" ? activeClassName : inactiveClassName
            }`}
            onClick={() => setSelectedTab("examples")}
          >
            Examples
          </button>
          <div className="ml-auto" hidden={selectedTab !== "examples"}>
            <Select
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
          </div>
        </nav>
        <TabPanel
          className="space-y-12 py-6"
          hidden={selectedTab !== "overview"}
        >
          <Overview />
        </TabPanel>
        <TabPanel
          className="space-y-12 py-6"
          hidden={selectedTab !== "documentation"}
        >
          <Documentation />
        </TabPanel>
        <TabPanel
          className="space-y-12 py-6"
          hidden={selectedTab !== "examples"}
        >
          <Examples locale={locale} />
        </TabPanel>
      </main>
    </div>
  );
}
