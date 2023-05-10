import { Container } from "@mui/material";
import Navbar from "./Navbar";
import Router from "./Router";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Container sx={{ py: 4 }}>
        <Router />
      </Container>
    </>
  );
};

export default Layout;
