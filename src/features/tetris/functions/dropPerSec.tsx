import moveFallingBlock from "./moveFallingBlock";
import { TETRIS_BOX, TETRIS_COL, TETRIS_ROW } from "../../../common/constants";
import explode from "./explode";
import isGameOver from "./isGameOver";
import { AllSetStateType } from "../game";
import checkWarning from "./checkWarning";

/*
  테트리스에서 떨어지는 블록이 더 떨어질 수 없으면 한 줄이 꽉 찼는지 체크해 그 줄을 터뜨리고, 그 후 게임 오버를 체크하고, 블록이 더 떨어질 수 있으면 그 블록을 한 칸 내리는 함수.
*/

export default function dropPerSec({
  setField,
  fallingBlock,
  setPieces,
  setScore,
  setHolding,
  setWarning,
  lineClearAudioRef,
}: AllSetStateType) {
  setField((_field) => {
    const newField = _field.map((arr) => [...arr]);

    // 떨어지는 블록을 아래로 한 칸 내립니다.
    if (moveFallingBlock(newField, 1, 0) === false) {
      // 내릴 공간이 없을 때, 떨어지는 블록을 고정 블록으로 전환합니다.
      for (let i = 0; i < TETRIS_ROW; i++) {
        for (let j = 0; j < TETRIS_COL; j++) {
          if (newField[i][j] === TETRIS_BOX.FALLING) {
            newField[i][j] = fallingBlock.current[0];
          }
        }
      }
      setHolding(([shape]) => [shape, 1]);
      explode(newField, setScore, lineClearAudioRef);
      if (!isGameOver(newField)) {
        checkWarning(newField, setWarning);
        setPieces((x) => x + 1);
      }
    }
    return newField;
  });
}
