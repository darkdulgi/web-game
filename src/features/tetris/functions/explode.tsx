import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { TETRIS_BOX, TETRIS_COL, TETRIS_ROW } from "../../../common/constants";

export default function explode(
  field: number[][],
  setScore: Dispatch<SetStateAction<number>>,
  lineClearAudioRef: MutableRefObject<HTMLAudioElement | null>,
) {
  let isGotScore: boolean = false;
  // 꽉 찬 행이 있으면 그 행을 비우고 점수를 올립니다.
  for (let i = 4; i < TETRIS_ROW; i++) {
    const isFull = field[i].every((value) => value >= 0 && value !== TETRIS_BOX.FALLING);
    if (isFull) {
      isGotScore = true;
      setScore((x) => x + 100);
      for (let j = 0; j < TETRIS_COL; j++) {
        field[i][j] = TETRIS_BOX.EMPTY;
      }
    }
  }

  if (isGotScore && lineClearAudioRef.current) {
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
