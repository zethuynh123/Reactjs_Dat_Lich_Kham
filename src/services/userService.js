import axios from "../axios";

const handleLoginApi = async (email, password) => {
  return axios.post("/api/login", {
    email,
    password,
  });
};

export { handleLoginApi };
