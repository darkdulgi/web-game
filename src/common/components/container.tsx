import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="bg-slate-200 min-w-fit w-full h-dvh flex justify-center pt-40">
      {children}
    </div>
  );
}
