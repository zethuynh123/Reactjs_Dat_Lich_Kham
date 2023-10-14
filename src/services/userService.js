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

const addNewUser = async (data) => {
  let params = {
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    address: data.address,
    phoneNumber: data.phoneNumber,
    gender: data.gender,
    roleId: data.roleId,
    position: data.position,
    image: data.image,
  };
  let result = await axios.post("/api/create-user", params);
  return result.data;
};

const editUser = async (data) => {
  let result = await axios.put("/api/edit-user", data);
  return result.data;
};

const deleteUser = async (id) => {
  let params = { id };
  let result = await axios.delete("/api/delete-user", { params });
  return result.data;
};

const getAllCodeService = async (type) => {
  let result = await axios.get("/api/allcode", { params: { type } });
  return result.data;
};

const fetchTopDoctorService = async (limit) => {
  let result = await axios.get("/api/top-doctor-home", { params: { limit } });
  return result.data;
};

export {
  handleLoginApi,
  getAllUser,
  addNewUser,
  deleteUser,
  editUser,
  getAllCodeService,
  fetchTopDoctorService,
};
