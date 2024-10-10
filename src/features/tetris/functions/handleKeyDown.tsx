import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_UP } from "../../../common/constants";
import moveFallingBlock from "./moveFallingBlock";
import rotateFallingBlock from "./rotateFallingBlock";

export default function handleKeyDown(
  e: KeyboardEvent,
  setField: Dispatch<SetStateAction<number[][]>>,
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
    }

    return newField;
  });
}
