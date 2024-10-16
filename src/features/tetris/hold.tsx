import { useEffect, useState } from "react";
import { TETRIS_BOX } from "../../common/constants";
import placeBlock from "./functions/placeBlock";

export default function Hold({ holding }: { holding: number[] }) {
  const [holdingField, setHoldingField] = useState<number[][]>([]);
  const [shape, isPossible] = holding;

  useEffect(() => {
    const newField = Array<number>(2)
      .fill(TETRIS_BOX.EMPTY)
      .map(() => Array<number>(4).fill(TETRIS_BOX.EMPTY));

    if (shape !== -1) {
      placeBlock(newField, shape, 0, 0, shape);
    }
    setHoldingField(newField);
  }, [holding]);

  function color(value: number) {
    if (value > 0) {
      if (isPossible) return "bg-black";
      return "bg-neutral-300";
    }
    return "bg-neutral-200";
  }

  return (
    <div className="flex flex-col">
      {holdingField.map((row, xIndex) => (
        <div key={xIndex} className="flex">
          {row.map((value, yIndex) => (
            <div key={yIndex} className={`w-4 h-4 ${color(value)}`} />
          ))}
        </div>
      ))}
    </div>
  );
}
