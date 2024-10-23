import moveFallingBlock from "./moveFallingBlock";
import { TETRIS_BOX, TETRIS_COL, TETRIS_ROW } from "../../../common/constants";
import explode from "./explode";
import isGameOver from "./isGameOver";
import { AllSetStateType } from "../game";
import checkWarning from "./checkWarning";

/**
 * 테트리스에서 블록이 맨 위에 생성되고 난 후, 1초마다 실행되는 함수입니다.
 * 떨어지는 블록이 내려갈 공간이 없으면 다음 동작을 실행합니다.
 */

export default function dropPerSec({
  setField,
  fallingBlock,
  setTurns,
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

      // 다음 턴에선 홀딩을 가능하게 합니다.
      setHolding(([shape]) => [shape, 1]);

      // 꽉 찬 행이 있으면 터뜨리고 점수를 계산합니다.
      explode(newField, setScore, lineClearAudioRef);

      // 게임 오버 판정 시 다음 턴을 진행하지 않습니다. 다만 게임 오버 상태로 바꾸진 않습니다.
      if (!isGameOver(newField)) {
        checkWarning(newField, setWarning);
        setTurns((x) => x + 1);
      }
    }
    return newField;
  });
}
