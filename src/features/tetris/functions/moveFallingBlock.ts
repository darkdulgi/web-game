import { TETRIS_BOX, TETRIS_COL, TETRIS_ROW } from "../../../common/constants";

/*
  테트리스에서 떨어지는 블록을 일정 거리로 움직이는 함수. 움직이지 못할 경우 false, 아니면 true를 반환.
*/

export default function moveFallingBlock(field: number[][], x: number, y: number) {
  if (!field.length || (!x && !y)) return false;
  let isPossible = true;

  for (let i = 0; i < TETRIS_ROW; i++) {
    for (let j = 0; j < TETRIS_COL; j++) {
      if (field[i][j] !== TETRIS_BOX.FALLING) continue;
      const xx = x + i;
      const yy = y + j;
      if (
        xx < 0 ||
        xx >= TETRIS_ROW ||
        yy < 0 ||
        yy >= TETRIS_COL ||
        (field[xx][yy] !== TETRIS_BOX.FALLING && field[xx][yy] !== TETRIS_BOX.EMPTY)
      ) {
        isPossible = false;
      }
    }
  }
  if (isPossible) {
    for (
      let i = x > 0 ? TETRIS_ROW - 1 - x : x;
      x > 0 ? i >= 0 : i < TETRIS_ROW;
      i += x > 0 ? -1 : 1
    ) {
      for (
        let j = y > 0 ? TETRIS_COL - 1 - y : y;
        y > 0 ? j >= 0 : j < TETRIS_COL;
        j += y > 0 ? -1 : 1
      ) {
        if (field[i][j] === TETRIS_BOX.FALLING) {
          [field[i][j], field[i + x][j + y]] = [field[i + x][j + y], field[i][j]];
        }
      }
    }
  }

  return isPossible;
}
