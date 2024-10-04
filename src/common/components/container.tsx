import { ReactNode } from "react";
import Sidebar from "./sideBar";
import Topbar from "./topbar";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="bg-neutral-100 flex flex-col xl:flex-row min-w-full w-fit min-h-dvh h-fit">
      <Sidebar />
      <Topbar />

      <div className="flex flex-col w-full pt-10 xl:pt-20">
        {children}
      </div>
    </div>
  );
}
