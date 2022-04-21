import { CalendarIcon, HomeIcon } from "@heroicons/react/outline";
import classnames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { GitHubLogo } from "./GitHubLogo";

const navigation = [
  { name: "Overview", href: "/", icon: HomeIcon, current: true },
  { name: "Examples", href: "/examples", icon: CalendarIcon, current: false },
];

const documentation = [
  {
    section: "react",
    pages: ["useTempocal", "Calendar"],
  },
  {
    section: "core",
    pages: [
      "clamp",
      "dateToTemporal",
      "getCalendarMonthDateRange",
      "getFirstDayOfWeek",
      "getHours",
      "getMinutes",
      "getMonthEndDate",
      "getMonths",
      "getMonthStartDate",
      "getWeekdays",
      "getYears",
      "temporalToDate",
    ],
  },
];

export function Sidebar() {
  const { pathname } = useRouter();

  return (
    <>
      <div className="flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-gray-200 text-4xl font-extrabold">Tempocal</h1>
        </div>
        <nav className="mt-5 flex-1" aria-label="Sidebar">
          <div className="px-2 space-y-1">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <a
                  className={classnames(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                    pathname === item.href
                      ? "bg-gray-200 text-gray-700"
                      : "text-gray-200 hover:bg-gray-200 hover:text-gray-700"
                  )}
                >
                  <item.icon
                    className={classnames(
                      pathname === item.href
                        ? "text-gray-600"
                        : "text-gray-300 group-hover:text-gray-600",
                      "mr-3 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              </Link>
            ))}
          </div>
        </nav>
      </div>
      <div className="flex-1 space-y-1 overflow-auto">
        {documentation.map(({ pages, section }) => (
          <Fragment key={section}>
            <h3
              className="px-3 text-xs font-semibold text-gray-300 uppercase tracking-wider"
              id={`tempocal-${section}`}
            >
              {`@tempocal/${section}`}
            </h3>
            <div
              className="px-2 space-y-1 pb-4"
              role="group"
              aria-labelledby={`tempocal-${section}`}
            >
              {pages.map((page) => (
                <Link key={`/${section}/${page}`} href={`/${section}/${page}`}>
                  <a
                    className={classnames(
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                      pathname === `/${section}/${page}`
                        ? "bg-gray-200 text-gray-700"
                        : "text-gray-200 hover:bg-gray-200 hover:text-gray-700"
                    )}
                  >
                    <span className="truncate">{page}</span>
                  </a>
                </Link>
              ))}
            </div>
          </Fragment>
        ))}
      </div>
      <div className="flex-shrink-0 flex border-t border-gray-500 p-4">
        <a
          href="https://github.com/Zertz/tempocal"
          className="flex-shrink-0 w-full group block"
        >
          <div className="flex items-center">
            <div className="bg-gray-200 group-hover:bg-gray-300 border-2 border-white rounded-full w-10 h-10">
              <GitHubLogo />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-200 group-hover:text-gray-300">
                Contribute on GitHub
              </p>
            </div>
          </div>
        </a>
      </div>
    </>
  );
}