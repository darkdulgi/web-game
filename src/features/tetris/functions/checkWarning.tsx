import { Dispatch, SetStateAction } from "react";
import { TETRIS_BOX } from "../../../common/constants";

/**
 * 게임 필드 위 1~2행, 4~7열에 블록이 존재하면 경고 상태로 전환하는 함수입니다.
 * @param field - 게임이 진행되는 2차원 필드
 * @param setWarning - 경고 상태를 수정하는 함수
 */

export default function checkWarning(
  field: number[][],
  setWarning: Dispatch<SetStateAction<boolean>>,
) {
  setWarning(() => {
    let isDangerous: boolean = false;
    for (let i = 4; i <= 5; i++) {
      for (let j = 3; j <= 6; j++) {
        if (field[i][j] >= 0 && field[i][j] !== TETRIS_BOX.FALLING) {
          isDangerous = true;
        }
      }
    }
    return isDangerous;
  });
}
