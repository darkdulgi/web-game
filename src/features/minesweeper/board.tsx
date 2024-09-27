import { Dispatch, SetStateAction, useEffect, useState } from "react";
import difficultyList from "./difficulty";
import shuffleList from "../../common/utils/shuffleList";
import MineBox from "./minebox";

export default function Board({
  currentDifficulty,
  isGameOver,
  setIsGameOver,
}: {
  currentDifficulty: number;
  isGameOver: boolean;
  setIsGameOver: Dispatch<SetStateAction<boolean>>;
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

  useEffect(() => {
    initialize();
    setIsGameOver(false);
  }, [currentDifficulty]);

  useEffect(() => {
    if (!isGameOver) {
      initialize();
    }
  }, [isGameOver]);

  return (
    <div>
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
              isGameOver={isGameOver}
              setIsGameOver={setIsGameOver}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
