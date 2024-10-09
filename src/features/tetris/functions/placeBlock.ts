import { TETRIS_SHAPE } from "../../../common/constants";

export default function placeBlock(
  field: number[][],
  shape: number,
  x: number,
  y: number,
  value: number,
) {
  if (!field.length) return;

  if (shape === TETRIS_SHAPE.LIMA_A) {
    field[x][y + 2] = value;
    field[x + 1][y] = value;
    field[x + 1][y + 1] = value;
    field[x + 1][y + 2] = value;
  } else if (shape === TETRIS_SHAPE.LIMA_B) {
    field[x][y] = value;
    field[x + 1][y] = value;
    field[x + 1][y + 1] = value;
    field[x + 1][y + 2] = value;
  } else if (shape === TETRIS_SHAPE.LINEAR) {
    field[x][y] = value;
    field[x][y + 1] = value;
    field[x][y + 2] = value;
    field[x][y + 3] = value;
  } else if (shape === TETRIS_SHAPE.MOUNTAIN) {
    field[x][y + 1] = value;
    field[x + 1][y] = value;
    field[x + 1][y + 1] = value;
    field[x + 1][y + 2] = value;
  } else if (shape === TETRIS_SHAPE.SNAKE_A) {
    field[x][y + 1] = value;
    field[x][y + 2] = value;
    field[x + 1][y] = value;
    field[x + 1][y + 1] = value;
  } else if (shape === TETRIS_SHAPE.SNAKE_B) {
    field[x][y] = value;
    field[x][y + 1] = value;
    field[x + 1][y + 1] = value;
    field[x + 1][y + 2] = value;
  } else if (shape === TETRIS_SHAPE.SQUARE) {
    field[x][y + 1] = value;
    field[x][y + 2] = value;
    field[x + 1][y + 1] = value;
    field[x + 1][y + 2] = value;
  }
}
