import { Dispatch, SetStateAction } from "react";

interface BoxType {
  row: number;
  rowIdx: number;
  column: number;
  colIdx: number;
  mineField: boolean[][];
  playerField: number[][];
  setPlayerField: Dispatch<SetStateAction<number[][]>>;
}

export default function MineBox({
  row,
  rowIdx,
  column,
  colIdx,
  mineField,
  playerField,
  setPlayerField,
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

  function onClickBox() {
    if (hereValue !== -1) return;
    if (mineField[rowIdx][colIdx]) {
      // 게임오버
      console.log("game over");
      return;
    }

    BFS();
  }

  return (
    <div
      onClick={onClickBox}
      className={`flex justify-center items-center w-10 h-10 border border-black ${hereValue < 0 ? "bg-gray-300" : "bg-slate-50"}`}
    >
      {hereValue > 0 && hereValue}
    </div>
  );
}
