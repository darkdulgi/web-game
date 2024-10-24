import { ReactNode } from "react";
import Sidebar from "./sidebar";
import Topbar from "./topbar";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="bg-neutral-900 flex flex-col xl:flex-row min-w-full w-fit min-h-dvh h-fit">
      <Sidebar />
      <Topbar />

      <div className="flex flex-col w-full pt-5 xl:pt-20">
        {children}
      </div>
    </div>
  );
}
