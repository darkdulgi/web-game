import { TETRIS_BOX, TETRIS_COL, TETRIS_ROW } from "../../../common/constants";
import { AllSetStateType } from "../game";

export default function initialize({
  setScore,
  setTurns,
  setWarning,
  setHolding,
  setField,
  setNextBlockList,
  lineClearAudioRef,
}: AllSetStateType) {
  setScore(0);
  setTurns(0);
  setWarning(false);
  setHolding([-1, 1]);
  setNextBlockList([]);
  setField(
    Array<number>(TETRIS_ROW)
      .fill(TETRIS_BOX.EMPTY)
      .map(() => Array<number>(TETRIS_COL).fill(TETRIS_BOX.EMPTY)),
  );
  if (lineClearAudioRef.current) {
    lineClearAudioRef.current.volume = 0.3;
  }
}
