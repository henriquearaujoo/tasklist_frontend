import axios from "axios";

const api = axios.create({
  baseURL: "http://165.227.207.242:8080",
});

export default api;
