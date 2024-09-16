import Bottombar from "@/components/Bottombar";
import LeftSidebar from "@/components/LeftSidebar";
import Topbar from "@/components/Topbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <Topbar />
      <Bottombar />
      <LeftSidebar />
      <section className="h-full flex flex-1 ">
        <Outlet />
      </section>
    </div>
  );
};

export default RootLayout;
