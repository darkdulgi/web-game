// 지뢰찾기에서 플레이어가 보고 있는 보드의 하나의 칸에 대한 상태입니다.
export const MINE_BOX = {
  CLOSED: -1,
  WAIT: -2,
  FLAG: -3,
  MINE: -99,
  MINE_RED: -98,
};

// 게임의 현재 상태입니다.
export const NOT_START = 0;
export const ON_GOING = 1;
export const GAME_OVER = 2;
export const GAME_CLEAR = 3;

// 마우스 이벤트 핸들링 시 전달되는 Event 인수의 Event.button 관련 상수입니다.
export const MOUSE_LEFT = 0;
export const MOUSE_CENTER = 1;
export const MOUSE_RIGHT = 2;

// 테트리스에서 하나의 칸에 대한 상태입니다.
export const TETRIS_BOX = {
  EMPTY: -1,
  GRAY: 0,
  MINT: 1,
  ORANGE: 2,
  BLUE: 3,
  PURPLE: 4,
  GREEN: 5,
  RED: 6,
  YELLOW: 7,
  FALLING: 100,
};

// 테트리스의 가로, 세로 길이입니다.
export const TETRIS_ROW = 20;
export const TETRIS_COL = 10;

// 테트리스에서 한번에 떨어질 수 있는 블록 뭉탱이의 분류입니다.
export const LINEAR = 1;
export const SQUARE = 2;
export const LIMA_A = 3;
export const LIMA_B = 4;
export const MOUNTAIN = 5;
export const SNAKE_A = 6;
export const SNAKE_B = 7;
