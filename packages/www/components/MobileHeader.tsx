import { MenuIcon } from "@heroicons/react/outline";

export function MobileHeader({
  setSidebarOpen,
}: {
  setSidebarOpen: (sidebarOpen: boolean) => void;
}) {
  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-between bg-gray-700 border-b border-gray-500 px-4 py-1.5">
        <div>
          <h1 className="text-gray-200 text-4xl font-extrabold">Tempocal</h1>
        </div>
        <div>
          <button
            type="button"
            className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-200 hover:text-gray-300"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
