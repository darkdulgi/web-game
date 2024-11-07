import { TETRIS_BOX, TETRIS_WID, TETRIS_HEI } from "../../../common/constants";
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
  setTurns(-1);
  setWarning(false);
  setHolding([-1, 1]);
  setNextBlockList([]);
  setField(
    Array<number>(TETRIS_HEI)
      .fill(TETRIS_BOX.EMPTY)
      .map(() => Array<number>(TETRIS_WID).fill(TETRIS_BOX.EMPTY)),
  );
  if (lineClearAudioRef.current) {
    lineClearAudioRef.current.volume = 0.3;
  }
}
