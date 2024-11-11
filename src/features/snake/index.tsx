import { MouseEvent, useState } from "react";
import { GAME_OVER, NOT_START, ON_GOING } from "../../common/constants";
import Game from "./game";

export default function Snake() {
  const [gameState, setGameState] = useState<number>(NOT_START);
  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (gameState === NOT_START) {
      setGameState(ON_GOING);
    } else {
      setGameState(NOT_START);
    }
  }

  return (
    <section className="w-full flex flex-col items-center">
      <span className="text-white">Snake Game</span>
      <Game gameState={gameState} setGameState={setGameState} />
      <span className={`${gameState !== GAME_OVER && "hidden"} text-red-600`}>GAME OVER</span>
      <button onClick={handleClick} className={`text-white ${gameState === ON_GOING && "hidden"}`}>
        {gameState === NOT_START ? "시작" : "다시"}
      </button>
    </section>
  );
}
