import Game from "./game";

export default function Main() {
  return (
    <div className="flex flex-col items-center">
      <span>추억의 게임들을 즐겨보세요!</span>

      <div className="grid grid-cols-2 gap-4">
        <Game name="지뢰찾기" link="/minesweeper" />
        <Game name="테트리스" link="/tetris" />
        <Game name="???" link="" />
        <Game name="???" link="" />
      </div>
    </div>
  );
}
