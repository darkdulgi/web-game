import { Dispatch, SetStateAction } from "react";
import { TETRIS_BOX } from "../../common/constants";

interface FieldType {
  field: number[][];
  setField: Dispatch<SetStateAction<number[][]>>;
  fallingBlockShape: number;
}

export default function Field({ field, setField, fallingBlockShape }: FieldType) {
  if (!field) return;

  function color(value: number) {
    if (value === TETRIS_BOX.FALLING) {
      value = fallingBlockShape;
    }

    if (value === TETRIS_BOX.EMPTY) return "bg-neutral-300";
    if (value === TETRIS_BOX.YELLOW) return "bg-yellow-300";
    if (value === TETRIS_BOX.BLUE) return "bg-blue-300";
    if (value === TETRIS_BOX.GREEN) return "bg-green-300";
    if (value === TETRIS_BOX.MINT) return "bg-cyan-300";
    if (value === TETRIS_BOX.ORANGE) return "bg-orange-300";
    if (value === TETRIS_BOX.PURPLE) return "bg-purple-300";
    if (value === TETRIS_BOX.RED) return "bg-red-300";
    return "";
  }

  return (
    <div className="flex flex-col">
      {field.map((row, x) => (
        <div key={x} className="flex">
          {row.map((box, y) => (
            <div className={`h-8 w-8 ${color(box)} border`} key={y}></div>
          ))}
        </div>
      ))}
    </div>
  );
}
