import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_UP } from "../../../common/constants";
import moveFallingBlock from "./moveFallingBlock";
import rotateFallingBlock from "./rotateFallingBlock";
import expectFallingBlock from "./expectFallingBlock";
import doHardDrop from "./doHardDrop";
import explode from "./explode";
import isGameOver from "./isGameOver";
import swapBlock from "./swapBlock";

export default function handleKeyDown(
  e: KeyboardEvent,
  setField: Dispatch<SetStateAction<number[][]>>,
  setPieces: Dispatch<SetStateAction<number>>,
  setScore: Dispatch<SetStateAction<number>>,
  setHolding: Dispatch<SetStateAction<number[]>>,
  setNextBlockList: Dispatch<SetStateAction<number[]>>,
  fallingBlock: MutableRefObject<number[]>,
) {
  setField((field) => {
    const newField = field.map((arr) => [...arr]);

    if (e.key === KEY_RIGHT || e.key === "d") {
      moveFallingBlock(newField, 0, 1);
    } else if (e.key === KEY_LEFT || e.key === "a") {
      moveFallingBlock(newField, 0, -1);
    } else if (e.key === KEY_DOWN || e.key === "s") {
      moveFallingBlock(newField, 1, 0);
    } else if (e.key === KEY_UP || e.key === "e") {
      rotateFallingBlock(newField, fallingBlock, 1);
    } else if (e.key === "q") {
      rotateFallingBlock(newField, fallingBlock, -1);
    } else if (e.key === " ") {
      doHardDrop(newField, fallingBlock.current[0]);
      explode(newField, setScore);
      setHolding(([shape]) => [shape, 1]);
      if (!isGameOver(newField)) {
        setPieces((x) => x + 1);
      }
    } else if (e.key === "Shift") {
      swapBlock(fallingBlock, setHolding, setNextBlockList, setPieces);
    }

    expectFallingBlock(newField);

    return newField;
  });
}
