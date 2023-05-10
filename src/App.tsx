import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Layout from "./components/Layout";
import { AuthProvider } from "./contexts/AuthContext";

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
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
