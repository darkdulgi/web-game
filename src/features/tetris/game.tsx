import {
  Dispatch,
  MouseEvent,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
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
  handleMouseDown: (e: MouseEvent<HTMLButtonElement>) => void;
}

export interface AllSetStateType {
  setScore: Dispatch<SetStateAction<number>>;
  setField: Dispatch<SetStateAction<number[][]>>;
  setNextBlockList: Dispatch<SetStateAction<number[]>>;
  setTurns: Dispatch<SetStateAction<number>>;
  setWarning: Dispatch<SetStateAction<boolean>>;
  setHolding: Dispatch<SetStateAction<number[]>>;
  fallingBlock: MutableRefObject<number[]>;
  lineClearAudioRef: MutableRefObject<HTMLAudioElement | null>;
}

export default function Game({ gameState, setGameState, countdown, handleMouseDown }: GameType) {
  const [score, setScore] = useState<number>(0);
  const [field, setField] = useState<number[][]>([]);
  const [nextBlockList, setNextBlockList] = useState<number[]>([]);
  const [turns, setTurns] = useState<number>(-1);
  const [warning, setWarning] = useState<boolean>(false);
  const [holding, setHolding] = useState<number[]>([-1, 1]);
  const fallingBlock = useRef<number[]>([0, 0]);
  const lineClearAudioRef = useRef<HTMLAudioElement>(null);

  const allSetState = {
    setScore,
    setField,
    setNextBlockList,
    setTurns,
    setWarning,
    setHolding,
    fallingBlock,
    lineClearAudioRef,
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
      setTurns(0);
    }

    return () => {
      window.removeEventListener("keydown", _handleKeyDown);
      if (lineClearAudioRef.current) {
        lineClearAudioRef.current.pause();
        lineClearAudioRef.current.currentTime = 0;
      }
    };
  }, [gameState]);

  useEffect(() => {
    if (field.length && isGameOver(field)) {
      setGameState(GAME_OVER);
    }
  }, [field]);

  useEffect(() => {
    if (gameState !== ON_GOING) return;

    popAndPlaceBlockOnTop(nextBlockList, field, warning, turns, allSetState);
    const timer = setInterval(() => {
      dropPerSec(allSetState);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [turns]);

  return (
    <div className="flex mt-10 xl:mt-20">
      <audio ref={lineClearAudioRef} src="/tetris/line-clear.mp3" preload="auto" />
      <Hold holding={holding} />
      <Field
        field={field}
        fallingBlock={fallingBlock}
        warning={warning}
        countdown={countdown}
        gameState={gameState}
        handleMouseDown={handleMouseDown}
      />
      <NextBlockAndScore nextBlockList={nextBlockList} score={score} />
    </div>
  );
}
