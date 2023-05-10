import * as React from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import {
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  InputBase,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { styled, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const Logo = styled("img")(({ theme }) => ({
  height: 30,
  [theme.breakpoints.up("sm")]: {
    height: 50,
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

const pages = [
  { text: "Explore Events", link: "/" },
  { text: "Create Event", link: "/event/create" },
];

const settings = [
  // { text: "Profile", link: "/profile" },
  { text: "Create Event", link: "/event/create" },
  //   { text: "Manage my Events", link: "/profile/events" },
  { text: "Logout", link: "/logout" },
];

function Navbar() {
  const { currentUser, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [search, setSearch] = React.useState("");

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer = (open) => (event) => {
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
        sx={{
          pl: 2,
          pt: 3,
          pb: 2,
          backgroundColor: "var(--color-secondary)",
        }}
      >
        <Link to="/">
          <img
            style={{ maxHeight: 40 }}
            src="/ae-logo-website.webp"
            alt="Allevents Logo"
          />
        </Link>
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

  const avatar = () => {
    return (
      <Box sx={{ flexGrow: 0, my: "auto", ml: 4 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt={currentUser.displayName} src={currentUser.photoURL} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting, index) => (
            <MenuItem
              key={index}
              onClick={handleCloseUserMenu}
              component={Link}
              to={setting.link}
            >
              <Typography textAlign="center">{setting.text}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    );
  };

  const keyPress = (e) => {
    if (e.keyCode == 13) {
      navigate("/?search=" + search);
    }
  };

  return (
    <React.Fragment>
      <AppBar color="secondary" position="static" elevation={2}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ my: 1 }}>
              <Link to="/">
                <Logo src="/ae-logo-website.webp" alt="Allevents Logo" />
              </Link>
            </Box>
            {/* <Search sx={{ ml: 4 }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => keyPress(e)}
              />
            </Search> */}

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
              {loading ? (
                ""
              ) : currentUser ? (
                avatar()
              ) : (
                <Button
                  variant="contained"
                  to={"/login"}
                  component={Link}
                  sx={{
                    my: 2,
                    ml: 2,
                    display: "block",
                  }}
                >
                  Login
                </Button>
              )}
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
