import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { TETRIS_BOX } from "../../common/constants";

interface FieldType {
  field: number[][];
  setField: Dispatch<SetStateAction<number[][]>>;
  fallingBlock: MutableRefObject<number[]>;
}

export default function Field({ field, setField, fallingBlock }: FieldType) {
  if (!field) return;

  function color(value: number, row: number) {
    if (value === TETRIS_BOX.FALLING) {
      value = fallingBlock.current[0];
    } else if (row < 4) return "invisible";

    if (value === TETRIS_BOX.EMPTY) return "bg-neutral-300";
    if (value === TETRIS_BOX.EXPECTED) return "bg-neutral-400";
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
            <div className={`h-8 w-8 ${color(box, x)} border`} key={y} />
          ))}
        </div>
      ))}
    </div>
  );
}
