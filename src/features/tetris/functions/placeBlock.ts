import { TETROMINO } from "../../../common/constants";

export default function placeBlock(
  field: number[][],
  shape: number,
  x: number,
  y: number,
  value: number,
) {
  if (!field.length) return;

  if (shape === TETROMINO.LIMA) {
    field[x][y + 2] = value;
    field[x + 1][y] = value;
    field[x + 1][y + 1] = value;
    field[x + 1][y + 2] = value;
  } else if (shape === TETROMINO.JULIETT) {
    field[x][y] = value;
    field[x + 1][y] = value;
    field[x + 1][y + 1] = value;
    field[x + 1][y + 2] = value;
  } else if (shape === TETROMINO.INDIA) {
    field[x][y] = value;
    field[x][y + 1] = value;
    field[x][y + 2] = value;
    field[x][y + 3] = value;
  } else if (shape === TETROMINO.TANGO) {
    field[x][y + 1] = value;
    field[x + 1][y] = value;
    field[x + 1][y + 1] = value;
    field[x + 1][y + 2] = value;
  } else if (shape === TETROMINO.SIERRA) {
    field[x][y + 1] = value;
    field[x][y + 2] = value;
    field[x + 1][y] = value;
    field[x + 1][y + 1] = value;
  } else if (shape === TETROMINO.ZULU) {
    field[x][y] = value;
    field[x][y + 1] = value;
    field[x + 1][y + 1] = value;
    field[x + 1][y + 2] = value;
  } else if (shape === TETROMINO.OSCAR) {
    field[x][y + 1] = value;
    field[x][y + 2] = value;
    field[x + 1][y + 1] = value;
    field[x + 1][y + 2] = value;
  }
}
