import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { SNAKE_HEI, SNAKE_WID } from "../../../common/constants";
import { PlayerStatusType } from "../game";

export default function initialize(
  setField: Dispatch<SetStateAction<number[][]>>,
  setScore: Dispatch<SetStateAction<number>>,
  player: MutableRefObject<PlayerStatusType>,
) {
  setField(
    Array<number>(SNAKE_HEI)
      .fill(0)
      .map(() => Array<number>(SNAKE_WID).fill(0)),
  );
  setScore(0);
  player.current = { xpos: SNAKE_HEI / 2, ypos: SNAKE_WID / 2, direction: 1 };
}
