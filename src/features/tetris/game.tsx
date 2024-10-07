import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { NOT_START, ON_GOING, TETRIS_BOX, TETRIS_COL, TETRIS_ROW } from "../../common/constants";
import Field from "./field";

interface GameType {
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
  gameState: number;
  setGameState: Dispatch<SetStateAction<number>>;
}

export default function Game({ score, setScore, gameState, setGameState }: GameType) {
  const [field, setField] = useState<number[][]>([]);
  const [nextBlock, setNextBlock] = useState<number[]>([]);
  const [fallingBlockShape, setFallingBlockShape] = useState<number>(0);

  function popAndPlaceBlockOnTop() {
    if (!nextBlock.length) return;
    const newBlockList = [...nextBlock];
    setFallingBlockShape(newBlockList.shift() as number);
    newBlockList.push(Math.floor(Math.random() * 7) + 1);
    setNextBlock(newBlockList);

    const newField = field.map((arr) => [...arr]);
    /*----------임시----------*/
    newField[0][4] = TETRIS_BOX.FALLING;
    /*----------임시----------*/

    setField(newField);
  }

  function initialize() {
    setScore(0);
    setField(
      Array<number>(TETRIS_ROW)
        .fill(TETRIS_BOX.EMPTY)
        .map(() => Array<number>(TETRIS_COL).fill(TETRIS_BOX.EMPTY)),
    );
    let newArr: number[] = [];
    for (let i = 0; i < 5; i++) {
      newArr = [...newArr, Math.floor(Math.random() * 7) + 1];
    }
    setNextBlock(newArr);
  }

  function dropPerSec() {
    setField((_field) => {
      const newField = _field.map((arr) => [...arr]);
      let isBottom = false;
      for (let i = 0; i < TETRIS_ROW; i++) {
        for (let j = 0; j < TETRIS_COL; j++) {
          if (
            newField[i][j] === TETRIS_BOX.FALLING &&
            (i === TETRIS_ROW - 1 ||
              (newField[i + 1][j] !== TETRIS_BOX.FALLING &&
                newField[i + 1][j] !== TETRIS_BOX.EMPTY))
          ) {
            isBottom = true;
          }
        }
      }
      if (!isBottom) {
        for (let i = TETRIS_ROW - 1; i > 0; i--) {
          for (let j = 0; j < TETRIS_COL; j++) {
            if (newField[i - 1][j] === TETRIS_BOX.FALLING) {
              [newField[i - 1][j], newField[i][j]] = [newField[i][j], newField[i - 1][j]];
            }
          }
        }
      }
      return newField;
    });
  }

  useEffect(() => {
    if (gameState === NOT_START) {
      initialize();
    } else if (gameState === ON_GOING) {
      popAndPlaceBlockOnTop();
    }
  }, [gameState]);

  useEffect(() => {
    const timer = setInterval(dropPerSec, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [nextBlock]);

  return (
    <div>
      <Field field={field} setField={setField} fallingBlockShape={fallingBlockShape} />
    </div>
  );
}
