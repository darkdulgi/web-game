import { MouseEvent } from "react";
import { GAME_OVER, NOT_START, ON_GOING } from "../../common/constants";

export default function StartAndRetryButton({
  countdown,
  gameState,
  handleMouseDown,
}: {
  countdown: number;
  gameState: number;
  handleMouseDown: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      disabled={countdown > 0}
      onMouseDown={handleMouseDown}
      className={`${(countdown > 0 || gameState === ON_GOING) && "hidden"} ${gameState === NOT_START ? "border-green-400 text-green-400" : "border-red-600 text-red-600"} z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black border-4 p-3 xl:p-5 text-3xl xl:text-5xl font-bold `}
    >
      <span className={`${gameState !== NOT_START && "hidden"}`}>START</span>

      <div
        className={`${gameState !== GAME_OVER && "hidden"} flex flex-col justify-center items-center gap-5 whitespace-nowrap`}
      >
        <span className="text-2xl">GAME OVER</span>
        <span>RETRY?</span>
      </div>
    </button>
  );
}
