import { TETRIS_BOX, TETRIS_WID, TETRIS_HEI } from "../../../common/constants";
import placeBlock from "./placeBlock";
import expectFallingBlock from "./expectFallingBlock";
import { AllSetStateType } from "../game";
import shuffleList from "../../../common/utils/shuffleList";

/**
 * 테트리스에서 한 턴이 시작되면 가장 먼저 실행되는 함수입니다.
 * 필드 최상단에서 떨어질 블록을 배치하고, 다음 블록 리스트를 갱신합니다.
 */

export default function popAndPlaceBlockOnTop(
  nextBlockList: number[],
  field: number[][],
  warning: boolean,
  turns: number,
  { fallingBlock, setNextBlockList, setField }: AllSetStateType,
) {
  function insert7Bag(blockList: number[]) {
    const mino = [1, 2, 3, 4, 5, 6, 7];
    shuffleList(mino);
    blockList.push(...mino);
  }
  const newBlockList = [...nextBlockList];

  // 7-bag 규칙으로 다음에 나올 블록을 생성합니다. 랜덤으로 배치하되 7묶음 내에는 반드시 한 종류의 블록이 존재합니다.
  if (turns % 7 === 0) {
    insert7Bag(newBlockList);
    if (turns === 0) insert7Bag(newBlockList);
  }

  // 다음 블록 리스트에서 맨 앞 블록을 뺀 뒤 '현재 떨어지고 있는 블록' 상태에 저장합니다.
  fallingBlock.current = [newBlockList.shift() as number, 0];
  setNextBlockList(newBlockList);

  // 이미 뺀 맨 앞 블록을 필드 맨 위에 배치합니다.
  const newField = field.map((arr) => [...arr]);
  for (let i = 0; i < TETRIS_HEI; i++) {
    for (let j = 0; j < TETRIS_WID; j++) {
      if (newField[i][j] === TETRIS_BOX.FALLING) {
        newField[i][j] = TETRIS_BOX.EMPTY;
      }
    }
  }
  placeBlock(newField, fallingBlock.current[0], warning ? 2 : 4, 3, TETRIS_BOX.FALLING);
  expectFallingBlock(newField);

  setField(newField);
}
