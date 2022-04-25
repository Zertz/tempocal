import { Sidebar } from "../components/Sidebar";

export function DesktopSidebar() {
  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-500 bg-gray-700">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
