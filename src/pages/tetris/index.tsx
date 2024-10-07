import { Helmet } from "react-helmet-async";
import Container from "../../common/components/container";
import Tetris from "../../features/tetris";

export default function TetrisPage() {
  return (
    <>
      <Helmet>
        <title>테트리스</title>
      </Helmet>
      <Container>
        <Tetris />
      </Container>
    </>
  );
}
