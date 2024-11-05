import MainPage from "./pages";
import MinesweeperPage from "./pages/minesweeper";
import SnakePage from "./pages/snake";
import TetrisPage from "./pages/tetris";

const router = [
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "minesweeper",
    element: <MinesweeperPage />,
  },
  {
    path: "tetris",
    element: <TetrisPage />,
  },
  {
    path: "snake",
    element: <SnakePage />,
  },
];

export default router;
