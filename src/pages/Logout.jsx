import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function logoutUser() {
    await logout();
    navigate("/login");
  }

  useEffect(() => {
    logoutUser();
  }, []);

  return (
    <div
      style={{
        padding: "80px 0",
        textAlign: "center",
        minHeight: "var(--minimum-main-page-height)",
      }}
    >
      <img style={{ maxWidth: "70px" }} src="/loader.svg" alt="" />
    </div>
  );
}

export default Logout;
