import { MutableRefObject } from "react";
import { TETRIS_BOX, TETROMINO } from "../../../common/constants";

export default function rotateFallingBlock(
  field: number[][],
  fallingBlock: MutableRefObject<number[]>,
  r: number,
) {
  if (!field.length || !r) return;

  const fallingBlockList: number[][] = [];
  const cur = [...fallingBlock.current];
  let centerPos: number[] = [];

  field.forEach((row, xpos) => {
    row.forEach((value, ypos) => {
      if (value === TETRIS_BOX.FALLING) {
        fallingBlockList.push([xpos, ypos]);
      }
    });
  });
  if (cur[0] === TETROMINO.OSCAR) return;
  if (cur[0] === TETROMINO.INDIA) {
    const dx = [0.5, 0.5, -0.5, 0.5];
    const dy = [0.5, -0.5, 0.5, 0.5];
    centerPos = [fallingBlockList[1][0] + dx[cur[1]], fallingBlockList[1][1] + dy[cur[1]]];
  }

  if (centerPos.length) {
    fallingBlockList.forEach((block) => {
      field[block[0]][block[1]] = TETRIS_BOX.EMPTY;
    });
    fallingBlockList.forEach((block) => {
      field[centerPos[0] + block[1] - centerPos[1]][centerPos[1] + centerPos[0] - block[0]] =
        TETRIS_BOX.FALLING;
    });
    fallingBlock.current[1] = (fallingBlock.current[1] + 1) % 4;
  }
}
