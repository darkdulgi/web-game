import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <nav className="flex justify-between px-2 py-1 xl:hidden w-full bg-neutral-800 text-white">
      <div className="flex items-center gap-3">
        <img className="h-10 w-10" src="/burger.svg" />

        <Link to="/" className="text-xl font-bold">Web Game</Link>
      </div>
    </nav>
  );
}
