import axios from "axios";
import { backURL } from "./constants";

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: `${backURL}/api/auth`,
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  signup(userData) {
    return this.api.post("/signup", userData);
  }

  login(userData) {
    return this.api.post("/login", userData);
  }

  verify = (token) => {
    return this.api.get("/verify", {
      headers: { Authorization: `Bearer ${token}` },
    });
  };
}

const authService = new AuthService();

export default authService;
