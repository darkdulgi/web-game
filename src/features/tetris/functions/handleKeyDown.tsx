import { Dispatch, SetStateAction } from "react";
import { KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_UP } from "../../../common/constants";
import moveFallingBlock from "./moveFallingBlock";
import rotateFallingBlock from "./rotateFallingBlock";

export default function handleKeyDown(
  e: KeyboardEvent,
  setField: Dispatch<SetStateAction<number[][]>>,
) {
  setField((field) => {
    const newField = field.map((arr) => [...arr]);

    if (e.key === KEY_RIGHT) {
      moveFallingBlock(newField, 0, 1);
    } else if (e.key === KEY_LEFT) {
      moveFallingBlock(newField, 0, -1);
    } else if (e.key === KEY_DOWN) {
      moveFallingBlock(newField, 1, 0);
    } else if (e.key === KEY_UP) {
      rotateFallingBlock(newField, 1);
    }

    return newField;
  });
}
