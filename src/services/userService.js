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

const fetchAllDoctorService = async () => {
  let result = await axios.get("/api/all-doctor", {});
  return result.data;
};

const saveDetailDoctorService = async (data) => {
  let result = await axios.post("/api/save-info-doctor", data);
  return result.data;
};

const getDetailDoctorService = async (id) => {
  let result = await axios.get("/api/get-detail-doctor-by-id", {
    params: { id },
  });
  return result.data;
};

const saveBulkSchedule = async (data) => {
  let result = await axios.post("/api/bulk-schedule", data);
  return result.data;
};

const getScheduleDoctorByDate = async (doctorId, date) => {
  let result = await axios.get("/api/get-schedule-doctor-by-date", {
    params: { doctorId, date },
  });
  return result.data;
};

const getExtraInfoDoctorByIdService = async (doctorId) => {
  let result = await axios.get("/api/get-extra-info-doctor-by-id", {
    params: { doctorId },
  });
  return result.data;
};

const bookAppointmentService = async (data) => {
  let result = await axios.post("/api/patient-book-appointment", data);
  return result.data;
};

const verifyEmailBooking = async (data) => {
  let result = await axios.post("/api/verify-booking-appointment", data);
  return result.data;
};

const createNewSpecialty = async (data) => {
  let result = await axios.post("/api/create-new-specialty", data);
  return result.data;
};

const getAllSpecialtyService = async () => {
  let result = await axios.get("/api/get-all-specialty", {});
  return result.data;
};

const getDetailSpecialtyByIdService = async (id, location) => {
  let result = await axios.get("/api/get-detail-specialty-by-id", {
    params: { id, location },
  });
  return result.data;
};

const createNewClinic = async (data) => {
  let result = await axios.post("/api/create-new-clinic", data);
  return result.data;
};

const getAllClinicService = async () => {
  let result = await axios.get("/api/get-all-clinic", {});
  return result.data;
};

const getDetailClinicByIdService = async (id) => {
  let result = await axios.get("/api/get-detail-clinic-by-id", {
    params: { id },
  });
  return result.data;
};

const getListPatientForDoctorService = async (id, date) => {
  let result = await axios.get("/api/get-list-patient-for-doctor", {
    params: { id, date },
  });
  return result.data;
};

const sendRemedyService = async (data) => {
  let result = await axios.post("/api/send-remedy", data);
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
  fetchAllDoctorService,
  saveDetailDoctorService,
  getDetailDoctorService,
  saveBulkSchedule,
  getScheduleDoctorByDate,
  getExtraInfoDoctorByIdService,
  bookAppointmentService,
  verifyEmailBooking,
  createNewSpecialty,
  getAllSpecialtyService,
  getDetailSpecialtyByIdService,
  createNewClinic,
  getAllClinicService,
  getDetailClinicByIdService,
  getListPatientForDoctorService,
  sendRemedyService,
};
