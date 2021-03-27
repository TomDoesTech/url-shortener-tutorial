import { Box } from "@chakra-ui/react";
import CreateShortURL from "./components/CreateShortURL";
import Background from "./components/Background";
import "./App.css";

function App() {
  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CreateShortURL />

      <Background />
    </Box>
  );
}

export default App;
