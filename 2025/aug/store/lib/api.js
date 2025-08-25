import axios from "axios";

// ⚠️ Replace localhost with LAN IP if testing on device
const api = axios.create({
  baseURL: "http://192.168.141.233:8000",
});

export default api;
