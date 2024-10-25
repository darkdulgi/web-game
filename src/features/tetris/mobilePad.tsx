import { MouseEvent } from "react";
import { KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_UP, ON_GOING } from "../../common/constants";
import vibrateMobile from "../../common/utils/vibrateMobile";

export default function MobilePad({ gameState }: { gameState: number }) {
  function handleClick(e: MouseEvent<HTMLButtonElement>, _key: string) {
    e.preventDefault();
    if (gameState === ON_GOING) {
      vibrateMobile(50);
      const event = new KeyboardEvent("keydown", { key: _key });
      window.dispatchEvent(event);
    }
  }

  const buttonStyle = "flex justify-center items-center border-4 border-neutral-500 h-12 font-bold";

  return (
    <div className="grid grid-cols-3 w-full gap-1 xl:hidden text-neutral-500 mb-10">
      <button onClick={(e) => handleClick(e, "z")} className={buttonStyle}>
        <img src="/tetris/rotate-counterclockwise.svg" className="h-10" />
      </button>

      <button onClick={(e) => handleClick(e, KEY_UP)} className={buttonStyle}>
        <img src="/tetris/rotate-clockwise.svg" className="h-10" />
      </button>

      <button onClick={(e) => handleClick(e, "Shift")} className={buttonStyle}>
        Hold
      </button>

      <button onClick={(e) => handleClick(e, KEY_LEFT)} className={buttonStyle}>
        ◀
      </button>

      <button onClick={(e) => handleClick(e, KEY_DOWN)} className={buttonStyle}>
        ▼
      </button>

      <button onClick={(e) => handleClick(e, KEY_RIGHT)} className={buttonStyle}>
        ▶
      </button>

      <div />

      <button onClick={(e) => handleClick(e, " ")} className={buttonStyle}>
        ▼▼
      </button>

      <div />
    </div>
  );
}
