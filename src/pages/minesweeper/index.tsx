import { Helmet } from "react-helmet-async";
import Container from "../../common/components/container";
import Minesweeper from "../../features/minesweeper";

export default function MinesweeperPage() {
  return (
    <>
      <Helmet>
        <title>지뢰찾기</title>
        <link rel="preload" href="/minesweeper/closed.svg" as="image" />
        <link rel="preload" href="/minesweeper/flag.svg" as="image" />
        <link rel="preload" href="/minesweeper/mine.svg" as="image" />
        <link rel="preload" href="/minesweeper/mine_red.svg" as="image" />
        <link rel="preload" href="/minesweeper/type0.svg" as="image" />
        <link rel="preload" href="/minesweeper/type1.svg" as="image" />
        <link rel="preload" href="/minesweeper/type2.svg" as="image" />
        <link rel="preload" href="/minesweeper/type3.svg" as="image" />
        <link rel="preload" href="/minesweeper/type4.svg" as="image" />
        <link rel="preload" href="/minesweeper/type5.svg" as="image" />
        <link rel="preload" href="/minesweeper/type6.svg" as="image" />
        <link rel="preload" href="/minesweeper/type7.svg" as="image" />
        <link rel="preload" href="/minesweeper/type8.svg" as="image" />
      </Helmet>
      <Container>
        <Minesweeper />
      </Container>
    </>
  );
}
