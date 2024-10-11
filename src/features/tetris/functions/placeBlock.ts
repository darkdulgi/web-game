import { TETROMINO } from "../../../common/constants";

/**
 * 특정 모양의 블록을 특정 좌표에 생성합니다.
 * @param field - 게임이 진행되는 2차원 배열
 * @param shape - 블록의 모양, 1~7사이 미리 정의된 상수
 * @param x - 블록이 생성되는 x좌표
 * @param y - 블록이 생성되는 y좌표
 * @param value - 블록의 상태
 * @returns - 반환값 없음
 */
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
