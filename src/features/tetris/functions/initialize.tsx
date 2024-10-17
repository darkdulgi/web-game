import { TETRIS_BOX, TETRIS_COL, TETRIS_ROW } from "../../../common/constants";
import { AllSetStateType } from "../game";

export default function initialize({
  setScore,
  setPieces,
  setWarning,
  setHolding,
  setField,
}: AllSetStateType) {
  setScore(0);
  setPieces(0);
  setWarning(false);
  setHolding([-1, 1]);
  setField(
    Array<number>(TETRIS_ROW)
      .fill(TETRIS_BOX.EMPTY)
      .map(() => Array<number>(TETRIS_COL).fill(TETRIS_BOX.EMPTY)),
  );
}
