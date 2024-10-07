import { useState } from "react";
import { NOT_START, ON_GOING } from "../../common/constants";
import Game from "./game";

export default function Tetris() {
  const [score, setScore] = useState<number>(0);
  const [gameState, setGameState] = useState<number>(NOT_START);
  return (
    <section className="w-full flex flex-col items-center">
      <span>Tetris</span>

      <Game score={score} setScore={setScore} gameState={gameState} setGameState={setGameState} />

      <button onClick={() => setGameState(ON_GOING)}>Start</button>
    </section>
  );
}
