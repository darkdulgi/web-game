import { Helmet } from "react-helmet-async";
import Container from "./common/components/container";
import Main from "./features/main";

function App() {
  return (
    <>
      <Helmet>
        <title>웹게임</title>
      </Helmet>
      <Container>
        <Main />
      </Container>
    </>
  );
}

export default App;
