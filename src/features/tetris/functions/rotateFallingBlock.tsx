import { MutableRefObject } from "react";
import { TETRIS_BOX, TETROMINO } from "../../../common/constants";

export default function rotateFallingBlock(
  field: number[][],
  fallingBlock: MutableRefObject<number[]>,
  r: number,
) {
  if (!field.length || !r) return;

  const fallingBlockList: number[][] = [];

  field.forEach((row, xpos) => {
    row.forEach((value, ypos) => {
      if (value === TETRIS_BOX.FALLING) {
        fallingBlockList.push([xpos, ypos]);
      }
    });
  });
  if (fallingBlock.current[0] === TETROMINO.OSCAR) return;

}
