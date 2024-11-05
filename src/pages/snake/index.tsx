import { Helmet } from "react-helmet-async";
import Container from "../../common/components/container";
import Snake from "../../features/snake";

export default function SnakePage() {
  return (
    <>
      <Helmet>
        <title>뱀 게임</title>
      </Helmet>
      <Container>
        <Snake />
      </Container>
    </>
  );
}
