import { useState } from "react";
import { Link } from "react-router-dom";

export default function Topbar() {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  return (
    <nav className="flex relative justify-between px-2 py-1 xl:hidden w-full bg-neutral-800 text-white">
      <div className="flex items-center gap-3">
        <button onClick={() => setMenuVisible((x) => !x)} className="h-10 w-10">
          <img src="/burger.svg" alt="햄버거" />
        </button>

        <Link to="/" className="text-xl font-bold">
          Web Game
        </Link>
      </div>

      <div
        className={`absolute transition flex flex-col left-0 top-full z-30 px-5 py-2 gap-2 bg-neutral-700 border-4 border-neutral-800 ${!menuVisible && "-translate-x-full"}`}
      >
        <Link to="/minesweeper">지뢰찾기</Link>
        <Link to="/tetris">테트리스</Link>
        <Link to="/snake">뱀 게임</Link>
      </div>
    </nav>
  );
}
