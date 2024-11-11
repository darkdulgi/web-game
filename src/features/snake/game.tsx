import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Field from "./field";
import { NOT_START, ON_GOING } from "../../common/constants";
import initialize from "./function/initialize";
import doPerFrame from "./function/doPerFrame";
import handleKeyDown from "./function/handleKeyDown";

interface GameType {
  gameState: number;
  setGameState: Dispatch<SetStateAction<number>>;
}

export interface PlayerStatusType {
  xpos: number;
  ypos: number;
  direction: number;
}

export default function Game({ gameState, setGameState }: GameType) {
  const [score, setScore] = useState<number>(0);
  const [field, setField] = useState<number[][]>([]);
  const [frame, setFrame] = useState<number>(0);
  const player = useRef<PlayerStatusType>({ xpos: 0, ypos: 0, direction: 0 });

  useEffect(() => {
    function _handleKeyDown(e: KeyboardEvent) {
      if (gameState !== ON_GOING) return;
      handleKeyDown(e, player);
    }
    window.addEventListener("keydown", _handleKeyDown);

    if (gameState === NOT_START) {
      initialize(setField, setScore, player);
    } else if (gameState === ON_GOING) {
      setFrame((x) => x + 1);
    }

    return () => {
      window.removeEventListener("keydown", _handleKeyDown);
    };
  }, [gameState]);

  useEffect(() => {
    if (!field.length || gameState !== ON_GOING) return;

    doPerFrame(score, setScore, field, setField, setGameState, player);

    setTimeout(() => {
      setFrame((x) => x + 1);
    }, 500);
  }, [frame]);

  return <Field field={field} score={score} />;
}
