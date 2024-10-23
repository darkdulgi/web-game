import { KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_UP } from "../../../common/constants";
import moveFallingBlock from "./moveFallingBlock";
import rotateFallingBlock from "./rotateFallingBlock";
import expectFallingBlock from "./expectFallingBlock";
import doHardDrop from "./doHardDrop";
import explode from "./explode";
import isGameOver from "./isGameOver";
import swapBlock from "./swapBlock";
import { AllSetStateType } from "../game";
import checkWarning from "./checkWarning";

export default function handleKeyDown(
  e: KeyboardEvent,
  {
    setField,
    setPieces,
    setScore,
    setHolding,
    setNextBlockList,
    setWarning,
    fallingBlock,
    lineClearAudioRef,
  }: AllSetStateType,
) {
  setField((field) => {
    const newField = field.map((arr) => [...arr]);

    if (e.key === KEY_RIGHT || e.key === "d") {
      moveFallingBlock(newField, 0, 1);
    } else if (e.key === KEY_LEFT || e.key === "a") {
      moveFallingBlock(newField, 0, -1);
    } else if (e.key === KEY_DOWN || e.key === "s") {
      moveFallingBlock(newField, 1, 0);
    } else if (e.key === KEY_UP || e.key === "x") {
      rotateFallingBlock(newField, fallingBlock, 1);
    } else if (e.key === "z" || e.key === "Control") {
      rotateFallingBlock(newField, fallingBlock, -1);
    } else if (e.key === " ") {
      doHardDrop(newField, fallingBlock.current[0]);
      explode(newField, setScore, lineClearAudioRef);
      setHolding(([shape]) => [shape, 1]);
      if (!isGameOver(newField)) {
        checkWarning(newField, setWarning);
        setPieces((x) => x + 1);
      }
    } else if (e.key === "Shift" || e.key === "c") {
      swapBlock(fallingBlock, setHolding, setNextBlockList, setPieces);
    }

    expectFallingBlock(newField);

    return newField;
  });
}
