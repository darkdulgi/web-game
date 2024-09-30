import { ChangeEvent, useState } from "react";
import Board from "./board";
import difficultyList from "./difficulty";
import { GAME_CLEAR, ON_GOING } from "../../common/constants";

export default function Minesweeper() {
  const [currentDifficulty, setCurrentDifficulty] = useState<number>(0);
  const [gameState, setGameState] = useState<number>(ON_GOING);

  function onChangeDifficulty(e: ChangeEvent<HTMLInputElement>) {
    setCurrentDifficulty(parseInt(e.target.value));
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
                onChange={onChangeDifficulty}
                checked={currentDifficulty === index}
                className="hidden"
              />

              <span>{diff.name}</span>
            </label>
          ))}
        </div>
      </form>

      <Board
        currentDifficulty={currentDifficulty}
        gameState={gameState}
        setGameState={setGameState}
      />

      <button
        onClick={() => setGameState(ON_GOING)}
        className={`${gameState === ON_GOING && "hidden"} bg-blue-500 text-white px-5 py-3`}
      >
        다시하기
      </button>

      <span className={`${gameState !== GAME_CLEAR && "hidden"} text-red-500`}>
        게임 클리어!
      </span>
    </div>
  );
}
