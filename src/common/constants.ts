// 지뢰찾기에서 플레이어가 보고 있는 보드의 하나의 칸에 대한 상태입니다.
export const MINE_BOX = {
  CLOSED: -1,
  WAIT: -2,
  FLAG: -3,
  MINE: -99,
  MINE_RED: -98,
};

// 마우스 이벤트 핸들링 시 전달되는 Event 인수의 Event.button 관련 상수입니다.
export const MOUSE_LEFT = 0;
export const MOUSE_CENTER = 1;
export const MOUSE_RIGHT = 2;
