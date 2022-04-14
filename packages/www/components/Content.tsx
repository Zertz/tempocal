import { useState } from "react";
import { DesktopSidebar } from "../components/DesktopSidebar";
import { MobileHeader } from "../components/MobileHeader";
import { MobileSidebar } from "../components/MobileSidebar";
import { Overview } from "../components/Overview";

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-gray-700">
      <MobileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <DesktopSidebar />
      <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
        <MobileHeader setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 relative z-0 flex overflow-hidden">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
            <div className="py-6 px-4 sm:px-6 lg:px-8 space-y-12 text-gray-200">
              <Overview />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
