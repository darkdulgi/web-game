import { MouseEvent, useEffect, useRef, useState } from "react";
import { GAME_OVER, NOT_START, ON_GOING } from "../../common/constants";
import Game from "./game";

export default function Tetris() {
  const [gameState, setGameState] = useState<number>(NOT_START);
  const [countdown, setCountdown] = useState<number>(-1);
  const timer = useRef<number>();

  useEffect(() => {
    if (countdown === 0) {
      setGameState(ON_GOING);
      clearInterval(timer.current);
    }
  }, [countdown]);

  function handleMouseDown(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (gameState === NOT_START) {
      setCountdown(3);
      timer.current = setInterval(() => {
        setCountdown((s) => s - 1);
      }, 1000);
    } else {
      setGameState(NOT_START);
    }
  }

  return (
    <section className="w-full flex flex-col items-center">
      <span className="text-white text-5xl font-bold">Tetris</span>

      <Game gameState={gameState} setGameState={setGameState} countdown={countdown} />

      <button disabled={countdown > 0} onMouseDown={handleMouseDown} className="text-white">
        {gameState === NOT_START ? "Start" : "Retry"}
      </button>

      <span className="text-red-500">{gameState === GAME_OVER && "Game Over"}</span>
    </section>
  );
}
