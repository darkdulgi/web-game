import { useEffect, useState } from "react";

export default function Timer({ gameState }: { gameState: number }) {
  const [timer, setTimer] = useState<number>(0);
  useEffect(() => {

  }, [gameState]);

  return <></>;
}
