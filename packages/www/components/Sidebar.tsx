import { CalendarIcon, HomeIcon } from "@heroicons/react/outline";
import classnames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";

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
              <svg viewBox="0 0 16 16" version="1.1">
                <path
                  fillRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                ></path>
              </svg>
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
