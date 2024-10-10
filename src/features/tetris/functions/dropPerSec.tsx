import { Dispatch, MutableRefObject, SetStateAction } from "react";
import moveFallingBlock from "./moveFallingBlock";
import { TETRIS_BOX } from "../../../common/constants";

/*
  테트리스에서 떨어지는 블록이 더 떨어질 수 없으면 한 줄이 꽉 찼는지 체크해 그 줄을 터뜨리고, 그 후 게임 오버를 체크하고, 블록이 더 떨어질 수 있으면 그 블록을 한 칸 내리는 함수.
*/

export default function dropPerSec(
  setField: Dispatch<SetStateAction<number[][]>>,
  fallingBlock: MutableRefObject<number[]>,
  setPieces: Dispatch<SetStateAction<number>>,
) {
  setField((_field) => {
    const newField = _field.map((arr) => [...arr]);

    // 떨어지는 블록을 아래로 한 칸 내립니다.
    if (moveFallingBlock(newField, 1, 0) === false) {

      // 내릴 공간이 없을 때, 떨어지는 블록을 고정 블록으로 전환합니다.
      newField.forEach((row) => {
        row.forEach((value, index) => {
          if (value === TETRIS_BOX.FALLING) {
            row[index] = fallingBlock.current[0];
          }
        });
      });
      setPieces((x) => x + 1);
    }
    return newField;
  });
}
