import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { NOT_START, ON_GOING, TETRIS_BOX, TETRIS_COL, TETRIS_ROW } from "../../common/constants";
import Field from "./field";
import popAndPlaceBlockOnTop from "./functions/popAndPlaceBlockOnTop";
import dropPerSec from "./functions/dropPerSec";
import handleKeyDown from "./functions/handleKeyDown";

interface GameType {
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
  gameState: number;
  setGameState: Dispatch<SetStateAction<number>>;
}

export default function Game({ score, setScore, gameState, setGameState }: GameType) {
  const [field, setField] = useState<number[][]>([]);
  const [nextBlockList, setNextBlockList] = useState<number[]>([]);
  const [fallingBlock, setFallingBlock] = useState<number>(0);

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
    setNextBlockList(newArr);
  }

  useEffect(() => {
    function _handleKeyDown(e: KeyboardEvent) {
      handleKeyDown(e, setField);
    }
    window.addEventListener("keydown", _handleKeyDown);
    return () => {
      window.addEventListener("keydown", _handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (gameState === NOT_START) {
      initialize();
    } else if (gameState === ON_GOING) {
      popAndPlaceBlockOnTop(nextBlockList, setNextBlockList, field, setField, setFallingBlock);
    }
  }, [gameState]);

  useEffect(() => {
    const timer = setInterval(() => {
      dropPerSec(setField);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [nextBlockList]);

  return (
    <div>
      <Field field={field} setField={setField} fallingBlock={fallingBlock} />
    </div>
  );
}
