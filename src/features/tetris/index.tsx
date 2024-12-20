import { MouseEvent, useEffect, useRef, useState } from "react";
import { NOT_START, ON_GOING } from "../../common/constants";
import Game from "./game";
import Logo from "./logo";
import MobilePad from "./mobilePad";

export default function Tetris() {
  const [gameState, setGameState] = useState<number>(NOT_START);
  const [countdown, setCountdown] = useState<number>(-1);
  const bgmRef = useRef<HTMLAudioElement>(null);
  const timer = useRef<number>();

  useEffect(() => {
    if (countdown === 0) {
      setGameState(ON_GOING);
      clearInterval(timer.current);
    }
  }, [countdown]);

  useEffect(() => {
    const bgm = bgmRef.current;
    if (!bgm) return;

    if (gameState === ON_GOING) {
      bgm.play().catch((e) => console.log(e));
    }

    const handleEnded = () => {
      bgm.currentTime = 0;
      bgm.play().catch((e) => console.log(e));
    };
    bgm.addEventListener("ended", handleEnded);

    return () => {
      bgm.removeEventListener("ended", handleEnded);
      bgm.pause();
      bgm.currentTime = 0;
    };
  }, [gameState]);

  function handleMouseDown(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (gameState === NOT_START) {
      setCountdown(3);
      timer.current = setInterval(() => {
        setCountdown((s) => s - 1);
      }, 1000);
    } else {
      setGameState(NOT_START);
    }
  }

  return (
    <section className="w-full flex flex-col items-center relative">
      <audio ref={bgmRef} src="/tetris/bradinsky.mp3" preload="auto" />
      <Logo />
      <Game
        gameState={gameState}
        setGameState={setGameState}
        countdown={countdown}
        handleMouseDown={handleMouseDown}
      />

      <MobilePad gameState={gameState} />
    </section>
  );
}
