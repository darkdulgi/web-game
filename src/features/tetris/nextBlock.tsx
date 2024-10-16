import { useEffect, useState } from "react";
import { TETRIS_BOX } from "../../common/constants";
import placeBlock from "./functions/placeBlock";

export default function NextBlock({ nextBlockList }: { nextBlockList: number[] }) {
  const [field, setField] = useState<number[][][]>([]);
  useEffect(() => {
    const newField = nextBlockList.map((shape) => {
      const arr = Array<number>(2)
        .fill(TETRIS_BOX.EMPTY)
        .map(() => Array<number>(4).fill(TETRIS_BOX.EMPTY));
      placeBlock(arr, shape, 0, 0, 1);
      return arr;
    });

    setField(newField);
  }, [nextBlockList]);

  function color(value: number) {
    if (value < 0) return "bg-neutral-200";
    return "bg-black";
  }

  return (
    <div className="flex flex-col gap-5">
      {field.map((shape, index) => (
        <div className="flex flex-col" key={index}>
          {shape.map((row, x) => (
            <div className="flex" key={x}>
              {row.map((block, y) => (
                <div className={`w-5 h-5 ${color(block)}`} key={y} />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
