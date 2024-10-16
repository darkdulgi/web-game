import { Dispatch, MutableRefObject, SetStateAction } from "react";

export default function swapBlock(
  fallingBlock: MutableRefObject<number[]>,
  setHolding: Dispatch<SetStateAction<number[]>>,
  setNextBlockList: Dispatch<SetStateAction<number[]>>,
  setPieces: Dispatch<SetStateAction<number>>,
) {
  setHolding((prevHold) => {
    const [shape, isPossible] = prevHold;
    if (!isPossible) return prevHold;

    if (shape > 0) {
      setNextBlockList((nextBlockList) => {
        return [shape, ...nextBlockList];
      });
    }
    setPieces((x) => x + 1);

    return [fallingBlock.current[0], 0];
  });
}
