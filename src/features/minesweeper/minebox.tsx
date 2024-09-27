import { Dispatch, MouseEvent, SetStateAction } from "react";
import { MINE_BOX, MOUSE_LEFT, MOUSE_RIGHT } from "../../common/constants";

interface BoxType {
  row: number;
  rowIdx: number;
  column: number;
  colIdx: number;
  mineField: boolean[][];
  playerField: number[][];
  setPlayerField: Dispatch<SetStateAction<number[][]>>;
  isGameOver: boolean;
  setIsGameOver: Dispatch<SetStateAction<boolean>>;
}

export default function MineBox({
  row,
  rowIdx,
  column,
  colIdx,
  mineField,
  playerField,
  setPlayerField,
  isGameOver,
  setIsGameOver,
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

  function showAllMine() {
    const newPlayerField = playerField.map((list) => [...list]);
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < column; j++) {
        if (mineField[i][j]) newPlayerField[i][j] = MINE_BOX.MINE;
      }
    }
    newPlayerField[rowIdx][colIdx] = MINE_BOX.MINE_RED;
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
      setIsGameOver(true);
      showAllMine();
    } else {
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
      disabled={isGameOver}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onContextMenu={(e) => e.preventDefault()}
      className={`flex justify-center w-10 h-10 items-center bg-cover`}
    />
  );
}
