import { Dispatch, SetStateAction } from "react";
import { TETRIS_BOX } from "../../common/constants";
import placeBlock from "./placeBlock";

/*
  테트리스에서 다음 블록 리스트의 맨 앞 블록을 뺀 뒤 필드 맨 위에 배치하고 새로운 랜덤 블록을 리스트 맨 뒤에 삽입하는 함수.
*/
export default function popAndPlaceBlockOnTop(
  nextBlockList: number[],
  setNextBlockList: Dispatch<SetStateAction<number[]>>,
  field: number[][],
  setField: Dispatch<SetStateAction<number[][]>>,
  setFallingBlockShape: Dispatch<SetStateAction<number>>,
) {
  // 다음 블록 리스트에서 맨 앞 블록을 뺀 뒤 '현재 떨어지고 있는 블록' 상태에 저장합니다.
  const newBlockList = [...nextBlockList];
  if (!newBlockList.length) return;
  const fallingBlock = newBlockList.shift() as number;
  setFallingBlockShape(fallingBlock);

  // 다음 블록 리스트의 맨 뒤에 랜덤한 블록을 삽입합니다.
  newBlockList.push(Math.floor(Math.random() * 7) + 1);
  setNextBlockList(newBlockList);

  // 이미 뺀 맨 앞 블록을 필드 맨 위에 배치합니다.
  const newField = field.map((arr) => [...arr]);
  placeBlock(newField, fallingBlock, 4, 3, TETRIS_BOX.FALLING);

  setField(newField);
}
