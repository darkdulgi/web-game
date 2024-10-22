import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { TETRIS_BOX, TETRIS_COL, TETRIS_ROW } from "../../../common/constants";

export default function explode(
  field: number[][],
  setScore: Dispatch<SetStateAction<number>>,
  lineClearAudioRef: MutableRefObject<HTMLAudioElement | null>,
) {
  let fullLines: number = 0;
  // 꽉 찬 행이 있으면 그 행을 비우고 점수를 올립니다.
  for (let i = 4; i < TETRIS_ROW; i++) {
    if (field[i].every((value) => value >= 0 && value !== TETRIS_BOX.FALLING)) {
      fullLines++;
      for (let j = 0; j < TETRIS_COL; j++) {
        field[i][j] = TETRIS_BOX.EMPTY;
      }
    }
  }

  // 점수를 계산하고 사운드 이펙트를 재생합니다.
  if (fullLines > 0 && lineClearAudioRef.current) {
    setScore((x) => x + fullLines);
    lineClearAudioRef.current.currentTime = 0;
    lineClearAudioRef.current.play().catch((e) => console.log(e));
  }

  // 빈 행이 있으면 위쪽의 행들을 아래로 내립니다.
  for (let i = TETRIS_ROW - 2; i >= 0; i--) {
    for (let ii = i + 1; ii < TETRIS_ROW; ii++) {
      const isEmpty = field[ii].every((value) => value < 0);
      if (isEmpty) {
        for (let j = 0; j < TETRIS_COL; j++) {
          [field[ii][j], field[ii - 1][j]] = [field[ii - 1][j], field[ii][j]];
        }
      } else break;
    }
  }
}
