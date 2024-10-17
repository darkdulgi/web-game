import { MouseEvent, useState } from "react";
import { GAME_OVER, NOT_START, ON_GOING } from "../../common/constants";
import Game from "./game";

export default function Tetris() {
  const [gameState, setGameState] = useState<number>(NOT_START);

  function handleMouseDown(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (gameState === NOT_START) setGameState(ON_GOING);
    else setGameState(NOT_START);
  }

  return (
    <section className="w-full flex flex-col items-center">
      <span>Tetris</span>

      <Game gameState={gameState} setGameState={setGameState} />

      <button onMouseDown={handleMouseDown} className="">
        {gameState === NOT_START ? "Start" : "Retry"}
      </button>

      <span className="text-red-500">{gameState === GAME_OVER && "Game Over"}</span>
    </section>
  );
}
