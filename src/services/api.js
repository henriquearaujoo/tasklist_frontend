import axios from "axios";

const api = axios.create({
  baseURL: "https://165.227.207.242:8443",
});

export default api;
