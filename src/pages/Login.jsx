import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Box, Paper, Typography } from "@mui/material";

const Login = () => {
  let { signInWithGoogle, currentUser, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      return;
    }
    if (currentUser) navigate("/");
  }, [currentUser, loading]);

  return (
    <Paper sx={{ p: 5, textAlign: "center", maxWidth: 800, margin: "auto" }}>
      <Box sx={{ p: 5, textAlign: "center" }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          Login to your Account
        </Typography>
        <Typography sx={{ maxWidth: 600, margin: "auto" }}>
          Explore a World of Events: Login Now and Join Over 130,000 Online,
          In-person and Hybrid Events with Fresh Additions Every Second!
        </Typography>
      </Box>
      <Box sx={{ p: 2, textAlign: "center" }}>
        <button className="login-with-google-btn" onClick={signInWithGoogle}>
          Login with Google
        </button>
      </Box>
    </Paper>
  );
};

export default Login;
