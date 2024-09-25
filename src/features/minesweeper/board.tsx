import { useEffect, useState } from "react";
import difficultyList from "./difficulty";
import shuffleList from "../../common/utils/shuffleList";

export default function Board({ currentDifficulty }: { currentDifficulty: number }) {
  const [mineField, setMineField] = useState<boolean[][]>([]);
  const { row, column, mine } = difficultyList[currentDifficulty];

  useEffect(() => {
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
  }, [currentDifficulty]);

  return (
    <div>
      {mineField.map((mineList, rowIdx) => (
        <div key={rowIdx} className="flex">
          {mineList.map((box, colIdx) => (
            <div key={colIdx} className="w-5 h-5 border border-black">
              {box && "x"}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
