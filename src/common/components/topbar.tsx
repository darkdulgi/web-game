import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <nav className="flex xl:hidden w-full bg-slate-200">
      <span>햄버거</span>

      <Link to="/">Web Game</Link>
    </nav>
  );
}
