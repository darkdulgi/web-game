import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { PlayerStatusType } from "../game";
import { GAME_OVER, SNAKE_HEI, SNAKE_WID } from "../../../common/constants";

export default function doPerFrame(
  score: number,
  setScore: Dispatch<SetStateAction<number>>,
  field: number[][],
  setField: Dispatch<SetStateAction<number[][]>>,
  setGameState: Dispatch<SetStateAction<number>>,
  player: MutableRefObject<PlayerStatusType>,
) {
  const newField = field.map((arr) => [...arr]);
  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];

  const newX = player.current.xpos + dx[player.current.direction];
  const newY = player.current.ypos + dy[player.current.direction];

  // 게임 오버 조건을 정의합니다.
  if (newX < 0 || newX >= SNAKE_HEI || newY < 0 || newY >= SNAKE_WID) {
    setGameState(GAME_OVER);
    return;
  }

  // 게임 오버가 되지 않을 시 다음 동작을 정의합니다.
  for (let x = 0; x < SNAKE_HEI; x++) {
    for (let y = 0; y < SNAKE_WID; y++) {
      if (newField[x][y] > 0) {
        newField[x][y]--;
      }
    }
  }

  newField[newX][newY] = score + 1;
  player.current.xpos = newX;
  player.current.ypos = newY;
  setField(newField);
}
