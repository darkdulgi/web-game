import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { NEXT_BLOCK, TETRIS_BOX, TETRIS_COL, TETRIS_ROW } from "../../../common/constants";
import placeBlock from "./placeBlock";
import expectFallingBlock from "./expectFallingBlock";

/*
  테트리스에서 다음 블록 리스트의 맨 앞 블록을 뺀 뒤 필드 맨 위에 배치하고 새로운 랜덤 블록을 리스트 맨 뒤에 삽입하는 함수.
*/

export default function popAndPlaceBlockOnTop(
  nextBlockList: number[],
  setNextBlockList: Dispatch<SetStateAction<number[]>>,
  field: number[][],
  setField: Dispatch<SetStateAction<number[][]>>,
  fallingBlock: MutableRefObject<number[]>,
  setWarning: Dispatch<SetStateAction<boolean>>,
) {
  setWarning((warning) => {
    const newBlockList = [...nextBlockList];
    // 다음 블록 리스트의 맨 뒤에 랜덤한 블록을 삽입합니다.
    while (newBlockList.length < NEXT_BLOCK + 1) {
      newBlockList.push(Math.floor(Math.random() * 7) + 1);
    }

    // 다음 블록 리스트에서 맨 앞 블록을 뺀 뒤 '현재 떨어지고 있는 블록' 상태에 저장합니다.
    fallingBlock.current = [newBlockList.shift() as number, 0];
    setNextBlockList(newBlockList);

    // 이미 뺀 맨 앞 블록을 필드 맨 위에 배치합니다.
    const newField = field.map((arr) => [...arr]);
    for (let i = 0; i < TETRIS_ROW; i++) {
      for (let j = 0; j < TETRIS_COL; j++) {
        if (newField[i][j] === TETRIS_BOX.FALLING) {
          newField[i][j] = TETRIS_BOX.EMPTY;
        }
      }
    }
    placeBlock(newField, fallingBlock.current[0], warning ? 2 : 4, 3, TETRIS_BOX.FALLING);
    expectFallingBlock(newField);

    setField(newField);

    return warning;
  });
}
