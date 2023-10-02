import axios from "../axios";

const handleLoginApi = async (email, password) => {
  return axios.post("/api/login", {
    email,
    password,
  });
};
const getAllUser = async (id) => {
  let result = await axios.get("/api/get-all-user", { params: { id } });
  return result.data;
};

export { handleLoginApi, getAllUser };
