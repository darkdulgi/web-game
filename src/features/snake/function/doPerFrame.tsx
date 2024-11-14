import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { PlayerStatusType } from "../game";
import { GAME_OVER, SNAKE_APPLE, SNAKE_HEI, SNAKE_WID } from "../../../common/constants";
import generateRandomApple from "./generateRandomApple";

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
  let direction = player.current.direction;
  const inputQueue = player.current.inputQueue;

  // 입력 큐에서 현재 방향에서 전환될 수 없는 방향(현재와 같은 방향과 180도 반대 방향)을 입력 큐에서 제거합니다.
  while (
    inputQueue.length > 0 &&
    (direction === inputQueue[0] ||
      (direction === 0 && inputQueue[0] === 2) ||
      (direction === 1 && inputQueue[0] === 3) ||
      (direction === 2 && inputQueue[0] === 0) ||
      (direction === 3 && inputQueue[0] === 1))
  ) {
    inputQueue.shift();
  }
  // 입력 큐가 비어있지 않으면 현재 방향을 변화시킵니다.
  if (inputQueue.length > 0) direction = inputQueue.shift() as number;

  const newX = player.current.xpos + dx[direction];
  const newY = player.current.ypos + dy[direction];

  // 게임 오버 조건을 정의합니다.
  if (newX < 0 || newX >= SNAKE_HEI || newY < 0 || newY >= SNAKE_WID || newField[newX][newY] > 0) {
    setGameState(GAME_OVER);
    return;
  }

  // 사과를 먹을 때와 아닐 시 동작을 정의합니다.
  if (newField[newX][newY] === SNAKE_APPLE) {
    setScore((x) => x + 1);
    newField[newX][newY] = score + 2;
  } else {
    for (let x = 0; x < SNAKE_HEI; x++) {
      for (let y = 0; y < SNAKE_WID; y++) {
        if (newField[x][y] > 0) {
          newField[x][y]--;
        }
      }
    }
    newField[newX][newY] = score + 1;
  }
  generateRandomApple(newField);
  player.current = { xpos: newX, ypos: newY, direction: direction, inputQueue: inputQueue };
  setField(newField);
}
