import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { PlayerStatusType } from "../game";
import { SNAKE_HEI, SNAKE_WID } from "../../../common/constants";

export default function doPerFrame(
  score: number,
  setScore: Dispatch<SetStateAction<number>>,
  field: number[][],
  setField: Dispatch<SetStateAction<number[][]>>,
  player: MutableRefObject<PlayerStatusType>,
) {
  const newField = field.map((arr) => [...arr]);
  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];
  for (let x = 0; x < SNAKE_HEI; x++) {
    for (let y = 0; y < SNAKE_WID; y++) {
      if (newField[x][y] > 0) {
        newField[x][y]--;
      }
    }
  }
  player.current.xpos += dx[player.current.direction];
  player.current.ypos += dy[player.current.direction];
  newField[player.current.xpos][player.current.ypos] = score + 1;

  setField(newField);
}
