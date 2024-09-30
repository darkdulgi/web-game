import { useState } from "react";
import Board from "./board";
import difficultyList from "./difficulty";
import { GAME_CLEAR, GAME_OVER, ON_GOING } from "../../common/constants";

export default function Minesweeper() {
  const [currentDifficulty, setCurrentDifficulty] = useState<number>(0);
  const [retryNum, setRetryNum] = useState<number>(0);
  const [gameState, setGameState] = useState<number>(ON_GOING);

  function getResultMessage() {
    if (gameState === GAME_CLEAR) return "모든 지뢰를 찾았습니다!";
    if (gameState === GAME_OVER) return "지뢰가 터졌습니다!";
    return "z";
  }

  return (
    <div className="flex flex-col items-center">
      <form className="bg-white w-fit px-5 py-3 rounded-lg shadow flex flex-col gap-3 items-center">
        <span className="text-xl">난이도 선택</span>

        <div className="flex gap-2">
          {difficultyList.map((diff, index) => (
            <label
              key={diff.name}
              className={`text-white px-5 py-2 shadow rounded-xl transition ${currentDifficulty === index ? "bg-blue-700" : "bg-blue-500"}`}
            >
              <input
                type="radio"
                value={index}
                onChange={(e) => setCurrentDifficulty(parseInt(e.target.value))}
                checked={currentDifficulty === index}
                className="hidden"
              />

              <span>{diff.name}</span>
            </label>
          ))}
        </div>
      </form>

      <div className="flex flex-col p-6 border-8 retro-button shadow">
        <span className={`${gameState === ON_GOING && "invisible"} text-red-600`}>
          {getResultMessage()}
        </span>

        <Board
          currentDifficulty={currentDifficulty}
          gameState={gameState}
          setGameState={setGameState}
          retryNum={retryNum}
        />

        <button
          onClick={() => setRetryNum((x) => x + 1)}
          className={`mt-4 border-4 retro-button retro-button-active py-2 `}
        >
          다시하기
        </button>
      </div>
    </div>
  );
}
