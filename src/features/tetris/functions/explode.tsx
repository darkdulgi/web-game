import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { TETRIS_BOX, TETRIS_WID, TETRIS_HEI } from "../../../common/constants";

export default function explode(
  field: number[][],
  setScore: Dispatch<SetStateAction<number>>,
  lineClearAudioRef: MutableRefObject<HTMLAudioElement | null>,
) {
  let fullLines: number = 0;
  // 꽉 찬 행이 있으면 그 행을 비우고 점수를 올립니다.
  for (let i = 4; i < TETRIS_HEI; i++) {
    if (field[i].every((value) => value >= 0 && value !== TETRIS_BOX.FALLING)) {
      fullLines++;
      for (let j = 0; j < TETRIS_WID; j++) {
        field[i][j] = TETRIS_BOX.EMPTY;
      }
    }
  }

  // 점수를 계산하고 사운드 이펙트를 재생합니다.
  if (fullLines > 0 && lineClearAudioRef.current) {
    setScore((x) => {
      if (fullLines === 1) x += 40;
      else if (fullLines === 2) x += 100;
      else if (fullLines === 3) x += 300;
      else if (fullLines === 4) x += 1200;
      return x;
    });
    lineClearAudioRef.current.currentTime = 0;
    lineClearAudioRef.current.play().catch((e) => console.log(e));
  }

  // 빈 행이 있으면 위쪽의 행들을 아래로 내립니다.
  for (let i = TETRIS_HEI - 2; i >= 0; i--) {
    for (let ii = i + 1; ii < TETRIS_HEI; ii++) {
      const isEmpty = field[ii].every((value) => value < 0);
      if (isEmpty) {
        for (let j = 0; j < TETRIS_WID; j++) {
          [field[ii][j], field[ii - 1][j]] = [field[ii - 1][j], field[ii][j]];
        }
      } else break;
    }
  }
}
