import Head from "next/head";
import * as React from "react";
import { TabPanel, useTabs } from "react-headless-tabs";
import { Documentation } from "../components/Documentation";
import { Examples } from "../components/Examples";
import { Overview } from "../components/Overview";

const baseClassName =
  "inline-flex items-center border-b-2 cursor-pointer mr-8 px-2 py-4 font-medium text-sm whitespace-nowrap focus:outline-none focus:border-gray-300 focus:text-gray-400";
const activeClassName = "border-gray-50 text-gray-50";
const inactiveClassName =
  "border-transparent hover:border-gray-300 text-gray-200 hover:text-gray-300";

export default function Main() {
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
    <>
      <Head>
        <link
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📅</text></svg>"
          rel="icon"
        />
        <title>
          @tempocal/react · Highly flexible building blocks to craft calendars
          with Temporal API
        </title>
      </Head>
      <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-700 text-gray-200">
        <main className="mx-auto w-full max-w-4xl p-2">
          <div className="pb-8 text-center">
            <h1 className="mb-2 text-4xl font-extrabold sm:text-6xl md:text-7xl">
              @tempocal/react
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
            <Examples />
          </TabPanel>
        </main>
      </div>
    </>
  );
}
