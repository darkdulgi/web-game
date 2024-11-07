import { TETRIS_BOX, TETRIS_WID, TETRIS_HEI } from "../../../common/constants";

/**
 * 테트리스에서 현재 떨어지는 블록이 그대로 떨어질 시 예상되는 위치를 보여주는 함수입니다.
 * @param field - 현재 게임이 진행되는 2차원 필드
 * @returns - 반환값 없음
 */

export default function expectFallingBlock(field: number[][]) {
  if (!field.length) return;

  const fallingBlockList: number[][] = [];

  for (let x = 0; x < TETRIS_HEI; x++) {
    for (let y = 0; y < TETRIS_WID; y++) {
      if (field[x][y] === TETRIS_BOX.FALLING) {
        fallingBlockList.push([x, y]);
      } else if (field[x][y] === TETRIS_BOX.EXPECTED) {
        field[x][y] = TETRIS_BOX.EMPTY;
      }
    }
  }

  while (fallingBlockList.length) {
    let isBottom = false;
    fallingBlockList.forEach(([x, y]) => {
      if (x + 1 >= TETRIS_HEI || (field[x + 1][y] >= 0 && field[x + 1][y] !== TETRIS_BOX.FALLING)) {
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
    if (field[x][y] !== TETRIS_BOX.FALLING) {
      field[x][y] = TETRIS_BOX.EXPECTED;
    }
  });
}
