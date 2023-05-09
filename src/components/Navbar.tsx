import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const pages = [
  { text: "Home", link: "/" },
  { text: "Project Summary", link: "/summary" },
];

function Navbar() {
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };

  const list = () => (
    <Box
      color="secondary"
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box
        sx={{ pl: 2, pt: 3, pb: 2, backgroundColor: "var(--color-secondary)" }}
      >
        <img
          style={{ maxHeight: 40 }}
          src="/ae-logo-website.webp"
          alt="Allevents Logo"
        />
      </Box>
      <List>
        {pages.map((page) => (
          <ListItem
            key={page.text}
            disablePadding
            selected={page.link === location.pathname}
          >
            <ListItemButton to={page.link} component={Link}>
              <ListItemText primary={page.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Button
          variant="contained"
          to="/login"
          component={Link}
          sx={{
            my: 2,
            ml: 2,
            color: "white",
          }}
        >
          Login
        </Button>
      </List>
    </Box>
  );

  return (
    <React.Fragment>
      <AppBar color="secondary" position="static" elevation={2}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img
              style={{ maxHeight: 50 }}
              src="/ae-logo-website.webp"
              alt="Allevents Logo"
            />

            <Box
              sx={{
                justifyContent: "flex-end",
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
              }}
            >
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleDrawer(true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                justifyContent: "flex-end",
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page.text}
                  onClick={toggleDrawer(false)}
                  sx={{
                    my: 2,
                    color:
                      page.link === location.pathname
                        ? "var(--color-primary)"
                        : "#fff",
                    display: "block",
                    fontWeight: page.link === location.pathname ? 700 : 400,
                  }}
                  to={page.link}
                  component={Link}
                >
                  {page.text}
                </Button>
              ))}
              <Button
                variant="contained"
                to="/login"
                component={Link}
                sx={{
                  my: 2,
                  ml: 2,
                  display: "block",
                }}
              >
                Login
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </React.Fragment>
  );
}
export default Navbar;
