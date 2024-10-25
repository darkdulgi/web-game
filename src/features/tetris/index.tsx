import { MouseEvent, useEffect, useRef, useState } from "react";
import { GAME_OVER, NOT_START, ON_GOING } from "../../common/constants";
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
    if (!bgmRef.current) return;
    if (gameState === ON_GOING) {
      bgmRef.current.play().catch((e) => console.log(e));
    }

    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current.currentTime = 0;
      }
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
      <span className="mt-3 text-red-600 text-xl xl:text-3xl font-bold">
        {gameState === GAME_OVER && "Game Over"}
      </span>

      <MobilePad gameState={gameState} />
    </section>
  );
}
