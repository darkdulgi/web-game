import { TETRIS_BOX, TETRIS_COL, TETRIS_ROW, TETROMINO } from "../../../common/constants";
import { wallKickData, wallKickData_INDIA } from "./wallKickData";

/**
 * 블록을 회전시켰을 때, Wall Kick의 경우를 처리합니다.
 * SRS(Standard Rotation System) 방식을 채택했으며, 자세한 규칙은 https://tetris.fandom.com/wiki/SRS
 *
 * @param field = 게임이 진행되는 2차원 배열
 * @param rotatedBlockList - 이미 회전된 각각의 블록 좌표([x,y]) 배열
 * @param fallingBlock - 회전하려는 블록의 모양과 회전하기 전 회전 상태를 나타내는 배열
 * @param isClockwise - 회전하려는 방향, 시계방향일 시 true, 아니면 false
 * @returns - 회전한 블록 배치에 성공할 시 true, 아니면 false
 */

export default function kickWall(
  field: number[][],
  rotatedBlockList: number[][],
  fallingBlock: number[],
  isClockwise: boolean,
) {
  let caseIdx: number = 0;
  let success: boolean = false;

  if (fallingBlock[1] === 0) {
    if (isClockwise) caseIdx = 0;
    else caseIdx = 7;
  } else if (fallingBlock[1] === 1) {
    if (isClockwise) caseIdx = 2;
    else caseIdx = 1;
  } else if (fallingBlock[1] === 2) {
    if (isClockwise) caseIdx = 4;
    else caseIdx = 3;
  } else if (fallingBlock[1] === 3) {
    if (isClockwise) caseIdx = 6;
    else caseIdx = 5;
  }

  const testList =
    fallingBlock[0] !== TETROMINO.INDIA ? wallKickData[caseIdx] : wallKickData_INDIA[caseIdx];

  testList.forEach(([text_x, text_y]) => {
    if (success) return;
    let isFailed: boolean = false;
    rotatedBlockList.forEach(([block_x, block_y]) => {
      const x = block_x - text_y;
      const y = block_y + text_x;
      if (
        x < 0 ||
        x >= TETRIS_ROW ||
        y < 0 ||
        y >= TETRIS_COL ||
        (field[x][y] >= 0 && field[x][y] !== TETRIS_BOX.FALLING)
      ) {
        isFailed = true;
      }
    });

    if (!isFailed) {
      rotatedBlockList.forEach(([block_x, block_y]) => {
        field[block_x - text_y][block_y + text_x] = TETRIS_BOX.FALLING;
      });
      success = true;
    }
  });

  return success;
}
