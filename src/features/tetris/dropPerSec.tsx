import { Dispatch, SetStateAction } from "react";
import { TETRIS_BOX, TETRIS_COL, TETRIS_ROW } from "../../common/constants";

/*
  테트리스에서 떨어지는 블록이 더 떨어질 수 없으면 한 줄이 꽉 찼는지 체크해 그 줄을 터뜨리고, 그 후 게임 오버를 체크하고, 블록이 더 떨어질 수 있으면 그 블록을 한 칸 내리는 함수.
*/

export default function dropPerSec(setField: Dispatch<SetStateAction<number[][]>>) {
  setField((_field) => {
    const newField = _field.map((arr) => [...arr]);
    let isBottom = false;
    for (let i = 0; i < TETRIS_ROW; i++) {
      for (let j = 0; j < TETRIS_COL; j++) {
        if (
          newField[i][j] === TETRIS_BOX.FALLING &&
          (i === TETRIS_ROW - 1 ||
            (newField[i + 1][j] !== TETRIS_BOX.FALLING && newField[i + 1][j] !== TETRIS_BOX.EMPTY))
        ) {
          isBottom = true;
        }
      }
    }
    if (isBottom) {
      // 줄 꽉차는 체크
    } else {
      for (let i = TETRIS_ROW - 1; i > 0; i--) {
        for (let j = 0; j < TETRIS_COL; j++) {
          if (newField[i - 1][j] === TETRIS_BOX.FALLING) {
            [newField[i - 1][j], newField[i][j]] = [newField[i][j], newField[i - 1][j]];
          }
        }
      }
    }
    return newField;
  });
}
