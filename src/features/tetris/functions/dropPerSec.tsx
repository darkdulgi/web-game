import { Dispatch, SetStateAction } from "react";
import moveFallingBlock from "./moveFallingBlock";

/*
  테트리스에서 떨어지는 블록이 더 떨어질 수 없으면 한 줄이 꽉 찼는지 체크해 그 줄을 터뜨리고, 그 후 게임 오버를 체크하고, 블록이 더 떨어질 수 있으면 그 블록을 한 칸 내리는 함수.
*/

export default function dropPerSec(setField: Dispatch<SetStateAction<number[][]>>) {
  setField((_field) => {
    const newField = _field.map((arr) => [...arr]);

    if (moveFallingBlock(newField, 1, 0) === false) {
      // 줄 꽉차는 체크
    }
    return newField;
  });
}
