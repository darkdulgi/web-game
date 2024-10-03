import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="bg-slate-200 min-w-full w-fit min-h-dvh pt-20 lg:pt-40">
      {children}
      <footer className="h-80"></footer>
    </div>
  );
}
