import { useEffect, useState } from "react";
import { NOT_START, ON_GOING } from "../../common/constants";

export default function Timer({ gameState }: { gameState: number }) {
  const [timerValue, setTimerValue] = useState<string>("0.0");
  useEffect(() => {
    // 게임 진행 시 타이머를 0.1초마다 증가시키며 999.9초 이후로는 증가하지 않습니다.
    let timer: number;
    if (gameState === ON_GOING) {
      timer = setInterval(() => {
        setTimerValue((s) => {
          if (Number(s) < 999.9) {
            return (Number(s) + 0.1).toFixed(1);
          }
          return "999.9";
        });
      }, 100);
    } else if (gameState === NOT_START) {
      setTimerValue("0.0");
    }
    return () => {
      clearInterval(timer);
    };
  }, [gameState]);

  return (
    <div className="border-4 w-20 pr-1 text-right text-2xl font-digital-mono bg-black text-red-500 retro-button-reverse">
      {timerValue}
    </div>
  );
}
