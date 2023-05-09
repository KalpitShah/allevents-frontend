import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Layout from "./components/Layout";

const theme = createTheme({
  palette: {
    primary: {
      main: "#21C0E8",
    },
    secondary: {
      main: "#2E363F",
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout />
    </ThemeProvider>
  );
}

export default App;
