import { Dispatch, MouseEvent, SetStateAction } from "react";
import {
  GAME_CLEAR,
  GAME_OVER,
  MINE_BOX,
  MOUSE_LEFT,
  MOUSE_RIGHT,
  NOT_START,
  ON_GOING,
} from "../../common/constants";

interface BoxType {
  row: number;
  rowIdx: number;
  column: number;
  colIdx: number;
  mineField: boolean[][];
  playerField: number[][];
  setPlayerField: Dispatch<SetStateAction<number[][]>>;
  gameState: number;
  setGameState: Dispatch<SetStateAction<number>>;
  showAllMine: (x?: number, y?: number) => void;
}

export default function MineBox({
  row,
  rowIdx,
  column,
  colIdx,
  mineField,
  playerField,
  setPlayerField,
  gameState,
  setGameState,
  showAllMine,
}: BoxType) {
  const hereValue = playerField[rowIdx][colIdx];

  function BFS() {
    const queue = [[rowIdx, colIdx]];
    const newPlayerField = playerField.map((list) => [...list]);
    const dx = [-1, -1, -1, 0, 1, 1, 1, 0];
    const dy = [-1, 0, 1, 1, 1, 0, -1, -1];
    newPlayerField[rowIdx][colIdx] = 0;

    while (queue.length > 0) {
      const x = queue[0][0];
      const y = queue[0][1];
      queue.shift();

      for (let i = 0; i < 8; i++) {
        const xx = x + dx[i];
        const yy = y + dy[i];
        if (xx >= 0 && xx < row && yy >= 0 && yy < column && mineField[xx][yy]) {
          newPlayerField[x][y]++;
        }
      }
      if (newPlayerField[x][y] > 0) continue;
      for (let i = 0; i < 8; i++) {
        const xx = x + dx[i];
        const yy = y + dy[i];
        if (xx >= 0 && xx < row && yy >= 0 && yy < column && newPlayerField[xx][yy] < 0) {
          newPlayerField[xx][yy] = 0;
          queue.push([xx, yy]);
        }
      }
    }

    setPlayerField(newPlayerField);
  }

  function handleMouseDown(e: MouseEvent<HTMLElement>) {
    if (e.button === MOUSE_RIGHT) {
      // 마우스 오른쪽 버튼을 누를 때 그 칸에 깃발을 세웁니다.
      if (hereValue !== MINE_BOX.CLOSED && hereValue !== MINE_BOX.FLAG) return;

      const newPlayerField = playerField.map((list) => [...list]);
      if (hereValue === MINE_BOX.CLOSED) newPlayerField[rowIdx][colIdx] = -3;
      else if (hereValue === MINE_BOX.FLAG) newPlayerField[rowIdx][colIdx] = -1;

      setPlayerField(newPlayerField);
    }
  }

  function handleMouseUp(e: MouseEvent<HTMLElement>) {
    if (hereValue !== MINE_BOX.CLOSED || e.button !== MOUSE_LEFT) return;

    if (mineField[rowIdx][colIdx]) {
      // 지뢰를 눌러 게임 오버가 됩니다.
      setGameState(GAME_OVER);
      showAllMine(rowIdx, colIdx);
    } else {
      //지뢰를 누르지 않아 필드를 펼칩니다.
      if (gameState === NOT_START) {
        setGameState(ON_GOING);
      }
      BFS();
    }
  }

  function numberToImgSrc() {
    let path = "/minesweeper/";
    if (hereValue >= 0) path += `type${hereValue}.svg`;
    else if (hereValue === MINE_BOX.CLOSED) path += "closed.svg";
    else if (hereValue === MINE_BOX.WAIT) path += "type0.svg";
    else if (hereValue === MINE_BOX.FLAG) path += "flag.svg";
    else if (hereValue === MINE_BOX.MINE) path += "mine.svg";
    else if (hereValue === MINE_BOX.MINE_RED) path += "mine_red.svg";

    return path;
  }

  return (
    <button
      style={{ backgroundImage: `url(${numberToImgSrc()})` }}
      disabled={gameState === GAME_OVER || gameState === GAME_CLEAR}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onContextMenu={(e) => e.preventDefault()}
      className={`flex justify-center w-8 h-8 items-center bg-cover`}
    />
  );
}
