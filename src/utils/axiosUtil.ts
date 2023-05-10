import axios from "axios";

const baseURL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost/allevents-backend/api"
    : "https://main-server.academix.in";

const instance = axios.create({
  baseURL: baseURL,
});

export default instance;
// https://github.com/axios/axios/issues/2448
