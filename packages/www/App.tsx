import { toTemporalInstant } from "@js-temporal/polyfill";
import { useEffect, useMemo } from "react";
import { TabPanel, useTabs } from "react-headless-tabs";
import { Examples } from "./Examples";
import { Overview } from "./Overview";

const baseClassName =
  "inline-flex items-center border-b-2 cursor-pointer mr-8 px-2 py-4 font-medium text-sm whitespace-nowrap focus:outline-none focus:border-gray-300 focus:text-gray-400";
const activeClassName = "border-gray-50 text-gray-50";
const inactiveClassName =
  "border-transparent hover:border-gray-300 text-gray-200 hover:text-gray-300";

// @ts-expect-error Yes.
Date.prototype.toTemporalInstant = toTemporalInstant;

export function App() {
  const defaultTab = useMemo(() => {
    if (typeof window === "undefined" || !window.location.hash) {
      return;
    }

    return window.location.hash.substring(1);
  }, []);

  const [selectedTab, setSelectedTab] = useTabs(
    ["overview", "documentation", "examples"],
    defaultTab
  );

  useEffect(() => {
    if (!selectedTab) {
      return;
    }

    window.location.hash = selectedTab;
  }, [selectedTab]);

  return (
    <div className="flex flex-col bg-gray-700 min-h-screen overflow-x-hidden text-gray-200 w-full">
      <main className="max-w-4xl mx-auto p-2 w-full">
        <div className="pb-8 text-center">
          <h1 className="font-extrabold mb-2 text-4xl sm:text-6xl md:text-7xl">
            Tempocal
          </h1>
          <a
            className="font-light hover:text-gray-300 text-xl transition-colors underline"
            href="https://github.com/Zertz/tempocal"
          >
            Contribute on GitHub
          </a>
        </div>
        <nav className="flex border-b border-gray-400 overflow-x-auto">
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
        </nav>
        <TabPanel
          className="py-6 space-y-12"
          hidden={selectedTab !== "overview"}
        >
          <Overview />
        </TabPanel>
        <TabPanel
          className="py-6 space-y-12"
          hidden={selectedTab !== "documentation"}
        >
          👀
        </TabPanel>
        <TabPanel
          className="py-6 space-y-12"
          hidden={selectedTab !== "examples"}
        >
          <Examples />
        </TabPanel>
      </main>
    </div>
  );
}