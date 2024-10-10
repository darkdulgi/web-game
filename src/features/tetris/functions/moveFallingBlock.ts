import { TETRIS_BOX, TETRIS_COL, TETRIS_ROW } from "../../../common/constants";

/*
  테트리스에서 떨어지는 블록을 일정 거리로 움직이는 함수. 움직이지 못할 경우 false, 아니면 true를 반환.
*/

export default function moveFallingBlock(field: number[][], x: number, y: number) {
  if (!field.length || (!x && !y)) return false;

  let isPossible = true;
  const fallingBlockList: number[][] = [];
  field.forEach((row, xpos) => {
    row.forEach((value, ypos) => {
      if (value === TETRIS_BOX.FALLING) {
        fallingBlockList.push([xpos, ypos]);
      }
    });
  });
  fallingBlockList.forEach((pos) => {
    const xpos = pos[0] + x;
    const ypos = pos[1] + y;
    if (
      xpos < 0 ||
      xpos >= TETRIS_ROW ||
      ypos < 0 ||
      ypos >= TETRIS_COL ||
      (field[xpos][ypos] !== TETRIS_BOX.FALLING && field[xpos][ypos] !== TETRIS_BOX.EMPTY)
    ) {
      isPossible = false;
    }
  });
  if (isPossible) {
    fallingBlockList.forEach((pos) => {
      field[pos[0]][pos[1]] = TETRIS_BOX.EMPTY;
    });
    fallingBlockList.forEach((pos) => {
      field[pos[0] + x][pos[1] + y] = TETRIS_BOX.FALLING;
    });
  }

  return isPossible;
}
