import { Dispatch, MouseEvent, TouchEvent, SetStateAction, useRef, useState } from "react";
import {
  GAME_CLEAR,
  GAME_OVER,
  MINE_BOX,
  MOUSE_LEFT,
  MOUSE_RIGHT,
  NOT_START,
  ON_GOING,
} from "../../common/constants";
import useMouseStore from "../../common/store/mouseStore";
import vibrateMobile from "../../common/utils/vibrateMobile";

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
  const mouseState = useMouseStore((state) => state.mouseState);
  const [isMouseEnter, setIsMouseEnter] = useState<boolean>(false);
  const [isLongPress, setIsLongPress] = useState<boolean>(false);
  const timerRef = useRef<number>(0);

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

  function plantFlag() {
    if (hereValue !== MINE_BOX.CLOSED && hereValue !== MINE_BOX.FLAG) return;
    vibrateMobile(50);
    const newPlayerField = playerField.map((list) => [...list]);
    if (hereValue === MINE_BOX.CLOSED) newPlayerField[rowIdx][colIdx] = MINE_BOX.FLAG;
    else if (hereValue === MINE_BOX.FLAG) newPlayerField[rowIdx][colIdx] = MINE_BOX.CLOSED;

    setPlayerField(newPlayerField);
  }

  function selectBox() {
    if (hereValue !== MINE_BOX.CLOSED) return;
    if (mineField[rowIdx][colIdx]) {
      // 지뢰를 눌러 게임 오버가 됩니다.
      vibrateMobile(200);
      setGameState(GAME_OVER);
      showAllMine(rowIdx, colIdx);
    } else {
      //지뢰를 누르지 않아 필드를 펼칩니다.
      vibrateMobile(50);
      if (gameState === NOT_START) {
        setGameState(ON_GOING);
      }
      BFS();
    }
  }

  function handleMouseDown(e: MouseEvent<HTMLElement>) {
    if (e.button === MOUSE_RIGHT) {
      // 마우스 우클릭할 시 그 칸에 깃발을 세웁니다.
      plantFlag();
    }
  }

  function handleMouseUp(e: MouseEvent<HTMLElement>) {
    // 마우스 좌클릭일 경우만 처리하고 모바일 터치로 중복 이벤트가 발생하는 것을 막습니다.
    if (e.button !== MOUSE_LEFT || "ontouchstart" in window) return;

    selectBox();
  }

  function handleTouchStart(e: TouchEvent<HTMLElement>) {
    if ((e.target as HTMLButtonElement).disabled) return;

    timerRef.current = setTimeout(() => {
      plantFlag();
      setIsLongPress(true);
    }, 300);
  }

  function handleTouchEnd(e: TouchEvent<HTMLElement>) {
    if ((e.target as HTMLButtonElement).disabled) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      if (isLongPress) {
        setIsLongPress(false);
      } else {
        selectBox();
      }
    }
  }

  function numberToImgSrc() {
    let path = "/minesweeper/";

    if (hereValue >= 0) {
      path += `type${hereValue}.svg`;
    } else if (hereValue === MINE_BOX.CLOSED) {
      if (mouseState && isMouseEnter) {
        path += "type0.svg";
      } else {
        path += "closed.svg";
      }
    } else if (hereValue === MINE_BOX.FLAG) {
      path += "flag.svg";
    } else if (hereValue === MINE_BOX.MINE) {
      path += "mine.svg";
    } else if (hereValue === MINE_BOX.MINE_RED) {
      path += "mine_red.svg";
    }

    return path;
  }

  return (
    <button
      style={{ backgroundImage: `url(${numberToImgSrc()})` }}
      disabled={gameState === GAME_OVER || gameState === GAME_CLEAR}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={() => setIsMouseEnter(true)}
      onMouseLeave={() => setIsMouseEnter(false)}
      onContextMenu={(e) => e.preventDefault()}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className={`flex justify-center w-8 h-8 items-center bg-cover`}
    />
  );
}
