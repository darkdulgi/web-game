import { Dispatch, SetStateAction, useState } from "react";

export default function Game({
  gameState,
  setGameState,
}: {
  gameState: number;
  setGameState: Dispatch<SetStateAction<number>>;
}) {
  const [score, setScore] = useState<number>(0);
  return <></>;
}
