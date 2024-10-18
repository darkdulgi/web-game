import { MutableRefObject } from "react";
import { TETRIS_BOX } from "../../common/constants";

interface FieldType {
  field: number[][];
  fallingBlock: MutableRefObject<number[]>;
}

export default function Field({ field, fallingBlock }: FieldType) {
  if (!field) return;

  function imgSrc(value: number) {
    if (value < 0) return;
    let imgSrc: string = "";

    if (value === TETRIS_BOX.FALLING) value = fallingBlock.current[0];
    if (value === TETRIS_BOX.YELLOW) imgSrc = "yellow_block.png";
    if (value === TETRIS_BOX.BLUE) imgSrc = "blue_block.png";
    if (value === TETRIS_BOX.GREEN) imgSrc = "green_block.png";
    if (value === TETRIS_BOX.CYAN) imgSrc = "cyan_block.png";
    if (value === TETRIS_BOX.PINK) imgSrc = "pink_block.png";
    if (value === TETRIS_BOX.PURPLE) imgSrc = "purple_block.png";
    if (value === TETRIS_BOX.RED) imgSrc = "red_block.png";
    return `url("/tetris/${imgSrc}")`;
  }

  function emptyboxStyle(value: number, row: number) {
    if (value >= 0) return;
    let style = "";
    if (row >= 4) style += "bg-black ";
    if (value === TETRIS_BOX.EXPECTED) style += "border-2 border-neutral-500 ";
    else if (row >= 4) style += "border border-neutral-950";
    return style;
  }

  return (
    <div className="flex flex-col">
      {field.map((row, x) => (
        <div key={x} className="flex">
          {row.map((value, y) => (
            <div
              style={{ backgroundImage: imgSrc(value) }}
              key={y}
              className={`h-8 w-8 ${emptyboxStyle(value, x)}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
