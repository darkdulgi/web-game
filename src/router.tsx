import App from "./App";
import MinesweeperPage from "./pages/minesweeper";
import TetrisPage from "./pages/tetris";

const router = [
  {
    path: "/",
    element: <App />,
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
