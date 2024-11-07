import { useState } from "react";
import { NOT_START } from "../../common/constants";
import Game from "./game";

export default function Snake() {
  const [gameState, setGameState] = useState<number>(NOT_START);
  return (
    <section>
      <span className="text-white">Snake Game</span>
      <Game gameState={gameState} setGameState={setGameState} />
    </section>
  );
}
