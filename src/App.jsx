import { useState } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { ProfileTab, Sidebar } from "./components";

const App = () => {
  const [sidebarToggle, setSidebarToggle] = useState(true);

  return (
    <main className="flex bg-[#f0fbff] min-h-[100vh] admin_container">
      <ScrollRestoration />
      <Sidebar
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
      />
      <div className="px-[2.5rem] w-full pb-[1rem]">
        <ProfileTab
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />
        <Outlet />
      </div>
    </main>
  );
};

export default App;
