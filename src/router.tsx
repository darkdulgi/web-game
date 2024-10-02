import MainPage from "./pages";
import MinesweeperPage from "./pages/minesweeper";
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
];

export default router;
