import { MutableRefObject } from "react";
import { PlayerStatusType } from "../game";
import { KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_UP } from "../../../common/constants";

export default function handleKeyDown(
  e: KeyboardEvent,
  player: MutableRefObject<PlayerStatusType>,
) {
  if (e.key === KEY_UP) {
    player.current.inputQueue.push(0);
  } else if (e.key === KEY_RIGHT) {
    player.current.inputQueue.push(1);
  } else if (e.key === KEY_DOWN) {
    player.current.inputQueue.push(2);
  } else if (e.key === KEY_LEFT) {
    player.current.inputQueue.push(3);
  }
}
