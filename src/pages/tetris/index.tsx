import { Helmet } from "react-helmet-async";
import Container from "../../common/components/container";
import Tetris from "../../features/tetris";

export default function TetrisPage() {
  return (
    <>
      <Helmet>
        <title>테트리스</title>
        <link rel="preload" href="/tetris/blue_block.png" as="image" />
        <link rel="preload" href="/tetris/blue_T.png" as="image" />
        <link rel="preload" href="/tetris/cyan_block.png" as="image" />
        <link rel="preload" href="/tetris/cyan_Z.png" as="image" />
        <link rel="preload" href="/tetris/green_block.png" as="image" />
        <link rel="preload" href="/tetris/green_L.png" as="image" />
        <link rel="preload" href="/tetris/pink_block.png" as="image" />
        <link rel="preload" href="/tetris/pink_J.png" as="image" />
        <link rel="preload" href="/tetris/purple_block.png" as="image" />
        <link rel="preload" href="/tetris/purple_I.png" as="image" />
        <link rel="preload" href="/tetris/red_block.png" as="image" />
        <link rel="preload" href="/tetris/red_O.png" as="image" />
        <link rel="preload" href="/tetris/yellow_block.png" as="image" />
        <link rel="preload" href="/tetris/yellow_S.png" as="image" />
        <link rel="preload" href="/tetris/bradinsky.mp3" as="audio" />
      </Helmet>
      <Container>
        <Tetris />
      </Container>
    </>
  );
}
