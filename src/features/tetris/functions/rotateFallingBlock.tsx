import { MutableRefObject } from "react";
import { TETRIS_BOX, TETROMINO } from "../../../common/constants";
import kickWall from "./kickWall";

/**
 * 테트리스에서 떨어지는 블록을 회전시킵니다.
 * @param field - 게임이 진행되는 2차원 배열
 * @param fallingBlock - 떨어지는 블록의 모양(테트로미노)과 현재 회전 상태를 나타내는 길이 2인 1차원 배열
 * @param r - 90도로 회전시키려는 방향, 1:시계방향, -1:반시계방향
 * @returns 반환값 없음
 */

export default function rotateFallingBlock(
  field: number[][],
  fallingBlock: MutableRefObject<number[]>,
  r: number,
) {
  if (!field.length || (r !== 1 && r !== -1)) return;

  const fallingBlockList: number[][] = [];
  const cur = [...fallingBlock.current];
  let centerPos: number[] = [];

  // 떨어지는 블록을 구성하는 각각의 좌표([x,y])를 따로 배열에 저장합니다.
  field.forEach((row, xpos) => {
    row.forEach((value, ypos) => {
      if (value === TETRIS_BOX.FALLING) {
        fallingBlockList.push([xpos, ypos]);
      }
    });
  });

  // 회전의 중심으로 할 좌표를 떨어지는 블록의 모양에 따라 다르게 정의합니다.
  if (cur[0] === TETROMINO.OSCAR) return;
  if (cur[0] === TETROMINO.INDIA) {
    const dx = [0.5, 0.5, -0.5, 0.5];
    const dy = [0.5, -0.5, 0.5, 0.5];
    centerPos = [fallingBlockList[1][0] + dx[cur[1]], fallingBlockList[1][1] + dy[cur[1]]];
  } else {
    let centerIdx: number[] = [];
    if (cur[0] === TETROMINO.JULIETT) {
      centerIdx = [2, 2, 1, 1];
    } else if (cur[0] === TETROMINO.SIERRA) {
      centerIdx = [3, 1, 0, 2];
    } else {
      centerIdx = [2, 1, 1, 2];
    }
    centerPos = [...fallingBlockList[centerIdx[cur[1]]]];
  }

  // centerPos를 기준으로 회전시킨 좌표를 계산합니다.
  fallingBlockList.forEach(([x, y]) => {
    field[x][y] = TETRIS_BOX.EMPTY;
  });
  const rotatedBlockList = fallingBlockList.map(([x, y]) => {
    return [centerPos[0] + r * (y - centerPos[1]), centerPos[1] + r * (centerPos[0] - x)];
  });

  // 블록을 회전시키며, 그럴 수 없으면 원상태로 복구합니다.
  if (!kickWall(field, rotatedBlockList, cur, r === 1)) {
    fallingBlockList.forEach(([x, y]) => {
      field[x][y] = TETRIS_BOX.FALLING;
    });
  }

  fallingBlock.current[1] = (fallingBlock.current[1] + r + 4) % 4;
}
