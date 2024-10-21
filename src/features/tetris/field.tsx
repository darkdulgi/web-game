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

  return (
    <div className="relative">
      <div className="mx-1 absolute -translate-y-full flex flex-col">
        {field
          .filter((_, x) => x < 4)
          .map((row, x) => (
            <div key={x} className="flex">
              {row.map((value, y) => (
                <div style={{ backgroundImage: imgSrc(value) }} key={y} className="h-8 w-8" />
              ))}
            </div>
          ))}
      </div>

      <div className="flex flex-col mx-1 mb-1 outline outline-4 outline-cyan-400">
        {field
          .filter((_, x) => x >= 4)
          .map((row, x) => (
            <div key={x} className="flex">
              {row.map((value, y) => (
                <div
                  style={{ backgroundImage: imgSrc(value) }}
                  key={y}
                  className={`h-8 w-8 bg-black ${value === TETRIS_BOX.EXPECTED ? "border-2 border-neutral-500" : value < 0 && "border border-neutral-950"}`}
                />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
