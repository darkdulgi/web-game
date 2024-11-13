import { SNAKE_APPLE, SNAKE_HEI, SNAKE_WID } from "../../../common/constants";

export default function generateRandomApple(field: number[][]) {
  const emptyBox = [];
  for (let i = 0; i < SNAKE_HEI; i++) {
    for (let j = 0; j < SNAKE_WID; j++) {
      if (field[i][j] === 0) {
        emptyBox.push([i, j]);
      }
    }
  }
  const randomPlace = Math.floor(Math.random() * emptyBox.length);
  field[emptyBox[randomPlace][0]][emptyBox[randomPlace][1]] = SNAKE_APPLE;
}
