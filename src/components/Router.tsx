import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Event from "../pages/Event";
import Logout from "../pages/Logout";
import CreateEvent from "../pages/CreateEvent";
import ManageEvents from "../pages/ManageEvents";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/logout" element={<Logout />}></Route>
      <Route path="/my-events/" element={<ManageEvents />}></Route>
      <Route path="/event/create" element={<CreateEvent />}></Route>
      <Route path="/event/:id" element={<Event />}></Route>
      <Route path="/event/update/:id" element={<CreateEvent />}></Route>
    </Routes>
  );
};

export default Router;
