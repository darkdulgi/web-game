import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav className="hidden xl:flex flex-col gap-3 h-dvh w-44 bg-neutral-800 text-white pl-4 pt-4 text-lg">
      <Link to="/" className="text-2xl font-bold">
        Web Game
      </Link>
      <Link to="/minesweeper">지뢰찾기</Link>
      <Link to="/tetris">테트리스</Link>
    </nav>
  );
}
