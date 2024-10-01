import { Dispatch, SetStateAction, useEffect, useState } from "react";
import difficultyList from "./difficulty";
import shuffleList from "../../common/utils/shuffleList";
import MineBox from "./minebox";
import { GAME_CLEAR, MINE_BOX, NOT_START } from "../../common/constants";

export default function Board({
  currentDifficulty,
  gameState,
  setGameState,
}: {
  currentDifficulty: number;
  gameState: number;
  setGameState: Dispatch<SetStateAction<number>>;
}) {
  const [mineField, setMineField] = useState<boolean[][]>([]);
  const [playerField, setPlayerField] = useState<number[][]>([]);
  const { row, column, mine } = difficultyList[currentDifficulty];

  function initialize() {
    // 1차원 배열을 만들어 지뢰를 넣고 셔플한 후, 2차원 배열에 할당합니다.
    const flatMineField: boolean[] = Array<boolean>(row * column)
      .fill(false)
      .fill(true, 0, mine);
    shuffleList(flatMineField);

    const newMineField: boolean[][] = Array(row)
      .fill(null)
      .map(() => Array<boolean>(column));
    for (let i = 0; i < flatMineField.length; i++) {
      newMineField[Math.floor(i / column)][i % column] = flatMineField[i];
    }

    setMineField(newMineField);
    setPlayerField(
      Array<number>(row)
        .fill(-1)
        .map(() => Array<number>(column).fill(-1)),
    );
  }

  function showAllMine(x?: number, y?: number) {
    const newPlayerField = playerField.map((list) => [...list]);
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < column; j++) {
        if (mineField[i][j]) newPlayerField[i][j] = MINE_BOX.MINE;
      }
    }
    if (x !== undefined && y !== undefined) {
      newPlayerField[x][y] = MINE_BOX.MINE_RED;
    }
    setPlayerField(newPlayerField);
  }

  function checkWin() {
    if (!mineField.length || !playerField.length) return;
    let isWin = true;
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < column; j++) {
        if (!mineField[i][j] && playerField[i][j] < 0) isWin = false;
      }
    }
    if (isWin) {
      setGameState(GAME_CLEAR);
    }
  }

  useEffect(() => {
    initialize();
    setGameState(NOT_START);
  }, [currentDifficulty]);

  useEffect(() => {
    if (gameState === GAME_CLEAR) {
      showAllMine();
    } else if (gameState === NOT_START) {
      initialize();
    }
  }, [gameState]);

  useEffect(() => {
    checkWin();
  }, [playerField]);

  return (
    <div className="border-8 border-t-neutral-500 border-l-neutral-500 border-r-white border-b-white">
      {playerField.map((mineList, rowIdx) => (
        <div key={rowIdx} className="flex">
          {mineList.map((_, colIdx) => (
            <MineBox
              key={colIdx}
              row={row}
              rowIdx={rowIdx}
              column={column}
              colIdx={colIdx}
              mineField={mineField}
              playerField={playerField}
              setPlayerField={setPlayerField}
              gameState={gameState}
              setGameState={setGameState}
              showAllMine={showAllMine}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
