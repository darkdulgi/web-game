import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { GAME_OVER, NOT_START, ON_GOING } from "../../common/constants";
import Field from "./field";
import popAndPlaceBlockOnTop from "./functions/popAndPlaceBlockOnTop";
import dropPerSec from "./functions/dropPerSec";
import handleKeyDown from "./functions/handleKeyDown";
import isGameOver from "./functions/isGameOver";
import Hold from "./hold";
import NextBlockAndScore from "./nextBlock";
import initialize from "./functions/initialize";

interface GameType {
  gameState: number;
  setGameState: Dispatch<SetStateAction<number>>;
  countdown: number;
}

export interface AllSetStateType {
  setScore: Dispatch<SetStateAction<number>>;
  setField: Dispatch<SetStateAction<number[][]>>;
  setNextBlockList: Dispatch<SetStateAction<number[]>>;
  setPieces: Dispatch<SetStateAction<number>>;
  setWarning: Dispatch<SetStateAction<boolean>>;
  setHolding: Dispatch<SetStateAction<number[]>>;
  fallingBlock: MutableRefObject<number[]>;
}

export default function Game({ gameState, setGameState, countdown }: GameType) {
  const [score, setScore] = useState<number>(0);
  const [field, setField] = useState<number[][]>([]);
  const [nextBlockList, setNextBlockList] = useState<number[]>([]);
  const [pieces, setPieces] = useState<number>(0);
  const [warning, setWarning] = useState<boolean>(false);
  const [holding, setHolding] = useState<number[]>([-1, 1]);
  const fallingBlock = useRef<number[]>([0, 0]);

  const allSetState = {
    setScore,
    setField,
    setNextBlockList,
    setPieces,
    setWarning,
    setHolding,
    fallingBlock,
  };

  useEffect(() => {
    function _handleKeyDown(e: KeyboardEvent) {
      if (gameState !== ON_GOING) return;
      handleKeyDown(e, allSetState);
    }
    window.addEventListener("keydown", _handleKeyDown);

    if (gameState === NOT_START) {
      initialize(allSetState);
    } else if (gameState === ON_GOING) {
      setPieces(1);
    }
    return () => {
      window.removeEventListener("keydown", _handleKeyDown);
    };
  }, [gameState]);

  useEffect(() => {
    if (field.length && isGameOver(field)) {
      setGameState(GAME_OVER);
    }
  }, [field]);

  useEffect(() => {
    if (gameState !== ON_GOING) return;

    popAndPlaceBlockOnTop(nextBlockList, field, warning, allSetState);
    const timer = setInterval(() => {
      dropPerSec(allSetState);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [pieces]);

  return (
    <div className="flex mt-20">
      <Hold holding={holding} />
      <Field field={field} fallingBlock={fallingBlock} warning={warning} countdown={countdown} />
      <NextBlockAndScore nextBlockList={nextBlockList} score={score} />
    </div>
  );
}
