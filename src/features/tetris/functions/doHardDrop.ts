import { TETRIS_BOX, TETRIS_COL, TETRIS_ROW } from "../../../common/constants";

export default function doHardDrop(field: number[][], fallingBlockShape: number) {
  if (!field.length) return;
  const fallingBlockList: number[][] = [];

  for (let x = 0; x < TETRIS_ROW; x++) {
    for (let y = 0; y < TETRIS_COL; y++) {
      if (field[x][y] === TETRIS_BOX.FALLING) {
        fallingBlockList.push([x, y]);
        field[x][y] = TETRIS_BOX.EMPTY;
      }
    }
  }

  while (true) {
    let isBottom = false;
    fallingBlockList.forEach(([x, y]) => {
      if (x + 1 >= TETRIS_ROW || (field[x + 1][y] >= 0 && field[x + 1][y] !== TETRIS_BOX.FALLING)) {
        isBottom = true;
      }
    });
    if (isBottom) break;
    else {
      fallingBlockList.forEach((block) => {
        block[0]++;
      });
    }
  }

  fallingBlockList.forEach(([x, y]) => {
    field[x][y] = fallingBlockShape;
  });
}
