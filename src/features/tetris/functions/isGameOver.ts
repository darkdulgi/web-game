import { TETRIS_BOX, TETRIS_WID } from "../../../common/constants";

export default function isGameOver(field: number[][]) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < TETRIS_WID; j++) {
      if (field[i][j] >= 0 && field[i][j] !== TETRIS_BOX.FALLING) {
        return true;
      }
    }
  }
  return false;
}
