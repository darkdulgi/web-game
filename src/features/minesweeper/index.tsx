import { useState } from "react";
import Board from "./board";
import difficultyList from "./difficulty";
import { GAME_CLEAR, GAME_OVER, ON_GOING } from "../../common/constants";
import Timer from "./timer";

export default function Minesweeper() {
  const [currentDifficulty, setCurrentDifficulty] = useState<number>(0);
  const [retryNum, setRetryNum] = useState<number>(0);
  const [gameState, setGameState] = useState<number>(ON_GOING);

  function getResultMessage() {
    if (gameState === GAME_CLEAR) return "모든 지뢰를 찾았습니다!";
    if (gameState === GAME_OVER) return "지뢰가 터졌습니다!";
    return "dummy";
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center p-6 border-8 retro-button shadow">
        <span className="text-4xl font-bold text-neutral-800">Minesweeper</span>

        <div className="pt-6 flex gap-2">
          {difficultyList.map((diff, index) => (
            <button
              key={diff.name}
              onClick={() => setCurrentDifficulty(index)}
              className={`py-1 w-20 border-4 ${currentDifficulty === index ? "bg-neutral-400 retro-button-reverse" : "retro-button retro-button-active"}`}
            >
              {diff.name}
            </button>
          ))}
        </div>

        <div className="flex w-full justify-between items-center">
          <div></div>

          <span
            className={`${gameState === ON_GOING ? "invisible" : gameState === GAME_OVER ? "text-red-600" : "text-blue-700"}`}
          >
            {getResultMessage()}
          </span>

          <Timer gameState={gameState} />
        </div>

        <Board
          currentDifficulty={currentDifficulty}
          gameState={gameState}
          setGameState={setGameState}
          retryNum={retryNum}
        />

        <button
          onClick={() => setRetryNum((x) => x + 1)}
          className={`mt-4 border-4 retro-button retro-button-active py-2 w-full`}
        >
          다시하기
        </button>
      </div>
    </div>
  );
}
