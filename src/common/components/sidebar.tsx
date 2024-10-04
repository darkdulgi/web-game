import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav className="hidden xl:flex flex-col h-dvh w-40 bg-slate-200 pl-4 pt-4">
      <Link to="/">Web Game</Link>
      <Link to="/minesweeper">지뢰찾기</Link>
      <Link to="/tetris">테트리스</Link>
    </nav>
  );
}
