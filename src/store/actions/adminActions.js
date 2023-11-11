import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  addNewUser,
  getAllUser,
  deleteUser,
  editUser,
  fetchTopDoctorService,
  fetchAllDoctorService,
  saveDetailDoctorService,
  getDetailDoctorService,
  saveBulkSchedule,
  getScheduleDoctorByDate,
  getExtraInfoDoctorByIdService,
  bookAppointmentService,
  getAllSpecialtyService,
} from "../../services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const fetchGenderStart = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllCodeService("gender");
      if (res.status === 200) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      dispatch(fetchGenderFailed());
    }
  };
};

export const fetchGenderSuccess = (payload) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  payload,
});
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

//fetch allcode by type

export const fetchAllCodeStart = (type) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.FETCH_ALLCODE_START });
      let res = await getAllCodeService(type);
      if (res.status === 200) {
        dispatch(fetchAllCodeSuccess(res.data));
      } else {
        dispatch(fetchAllCodeFailed());
      }
    } catch (error) {
      dispatch(fetchAllCodeFailed());
    }
  };
};

export const fetchAllCodeSuccess = (payload) => ({
  type: actionTypes.FETCH_ALLCODE_SUCCESS,
  payload,
});

export const fetchAllCodeFailed = () => ({
  type: actionTypes.FETCH_ALLCODE_FAILED,
});

//role
export const fetchRoleStart = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.FETCH_ROLE_START });
      let res = await getAllCodeService("role");
      if (res.status === 200) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (error) {
      dispatch(fetchRoleFailed());
    }
  };
};

export const fetchRoleSuccess = (payload) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  payload,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

//position
export const fetchPositionStart = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.FETCH_POSITION_START });
      let res = await getAllCodeService("position");
      if (res.status === 200) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (error) {
      dispatch(fetchPositionFailed());
    }
  };
};

export const fetchPositionSuccess = (payload) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  payload,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

//position
export const addNewUserStart = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.ADD_USER_START });
      let res = await addNewUser(data);
      if (res.status === 200) {
        dispatch(addNewUserSuccess(res));
      } else {
        dispatch(addNewUserFailed(res));
      }
    } catch (error) {
      dispatch(addNewUserFailed(error));
    }
  };
};

export const addNewUserSuccess = (payload) => ({
  type: actionTypes.ADD_USER_SUCCESS,
  payload,
});

export const addNewUserFailed = (payload) => ({
  type: actionTypes.ADD_USER_FAIL,
  payload,
});

//get all user
export const getAllUserStart = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.FETCH_ALL_USER_START });
      let res = await getAllUser("All");
      if (res.status === 200) {
        dispatch(getAllUserSuccess(res));
      } else {
        dispatch(getAllUserFailed(res));
      }
    } catch (error) {
      dispatch(getAllUserFailed(error));
    }
  };
};

export const getAllUserSuccess = (payload) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  payload,
});

export const getAllUserFailed = (payload) => ({
  type: actionTypes.FETCH_ALL_USER_FAIL,
  payload,
});

//delete user
export const deleteUserStart = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.DELETE_USER_START });
      let res = await deleteUser(id);
      if (res.status === 200) {
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          closeOnClick: true,
          closeButton: false,
        });
        dispatch(deleteUserSuccess(res));
        // dispatch(getAllUserStart());
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          closeOnClick: true,
          closeButton: false,
        });
        dispatch(deleteUserFailed(res));
      }
    } catch (error) {
      dispatch(deleteUserFailed(error));
    }
  };
};

export const deleteUserSuccess = (payload) => ({
  type: actionTypes.DELETE_USER_SUCCESS,
  payload,
});

export const deleteUserFailed = (payload) => ({
  type: actionTypes.DELETE_USER_FAIL,
  payload,
});

//edit user
export const editUserStart = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.EDIT_USER_START });
      let res = await editUser(data);
      if (res.status === 200) {
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          closeOnClick: true,
          closeButton: false,
        });
        dispatch(editUserSuccess(res));
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          closeOnClick: true,
          closeButton: false,
        });
        dispatch(editUserFailed(res));
      }
    } catch (error) {
      dispatch(editUserFailed(error));
    }
  };
};

export const editUserSuccess = (payload) => ({
  type: actionTypes.EDIT_USER_SUCCESS,
  payload,
});

export const editUserFailed = (payload) => ({
  type: actionTypes.EDIT_USER_FAIL,
  payload,
});

//get top doctor
export const fetchTopDoctorStart = (limit) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.FETCH_TOP_DOCTOR_START });
      let res = await fetchTopDoctorService(limit);
      if (res.status === 200) {
        dispatch(fetchTopDoctorSuccess(res));
      } else {
        dispatch(fetchTopDoctorFailed(res));
      }
    } catch (error) {
      console.log(error);
      dispatch(fetchTopDoctorFailed(error));
    }
  };
};

export const fetchTopDoctorSuccess = (payload) => ({
  type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
  payload,
});

export const fetchTopDoctorFailed = (payload) => ({
  type: actionTypes.FETCH_TOP_DOCTOR_FAIL,
  payload,
});

//get all doctor
export const fetchAllDoctorStart = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.FETCH_ALL_DOCTOR_START });
      let res = await fetchAllDoctorService();
      if (res.status === 200) {
        dispatch(fetchAllDoctorSuccess(res));
      } else {
        dispatch(fetchAllDoctorFailed(res));
      }
    } catch (error) {
      console.log(error);
      dispatch(fetchAllDoctorFailed(error));
    }
  };
};

export const fetchAllDoctorSuccess = (payload) => ({
  type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
  payload,
});

export const fetchAllDoctorFailed = (payload) => ({
  type: actionTypes.FETCH_ALL_DOCTOR_FAIL,
  payload,
});

//save detail doctor
export const saveDetailDoctorStart = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.SAVE_DETAIL_DOCTOR_START });
      let res = await saveDetailDoctorService(data);
      if (res.status === 200) {
        toast.success(res.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(saveDetailDoctorFailed(error));
    }
  };
};

export const saveDetailDoctorSuccess = (payload) => ({
  type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
  payload,
});

export const saveDetailDoctorFailed = (payload) => ({
  type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL,
  payload,
});

//get detail doctor
export const getDetailDoctorStart = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.GET_DETAIL_DOCTOR_START });
      let res = await getDetailDoctorService(id);
      if (res.status === 200) {
        dispatch(getDetailDoctorSuccess(res));
      } else {
        dispatch(getDetailDoctorFailed(res));
      }
    } catch (error) {
      dispatch(getDetailDoctorFailed(error));
    }
  };
};

export const getDetailDoctorSuccess = (payload) => ({
  type: actionTypes.GET_DETAIL_DOCTOR_SUCCESS,
  payload,
});

export const getDetailDoctorFailed = (payload) => ({
  type: actionTypes.GET_DETAIL_DOCTOR_FAIL,
  payload,
});

//get schedule hours
export const fetchAllScheduleHoursStart = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_START });
      let res = await getAllCodeService("TIME");
      if (res.status === 200) {
        dispatch(fetchAllScheduleHoursSuccess(res));
      } else {
        dispatch(fetchAllScheduleHoursFailed(res));
      }
    } catch (error) {
      console.log(error);
      dispatch(fetchAllScheduleHoursFailed(error));
    }
  };
};

export const fetchAllScheduleHoursSuccess = (payload) => ({
  type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS,
  payload,
});

export const fetchAllScheduleHoursFailed = (payload) => ({
  type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_FAIL,
  payload,
});

//save schedule hours
export const saveScheduleHoursStart = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.SAVE_ALLCODE_SCHEDULE_HOURS_START });
      let res = await saveBulkSchedule(data);
      if (res.status === 200) {
        dispatch(saveScheduleHoursSuccess(res));
        toast.success(res.message);
      } else {
        dispatch(saveScheduleHoursFailed(res));
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      dispatch(saveScheduleHoursFailed(error));
      toast.error(error);
    }
  };
};

export const saveScheduleHoursSuccess = (payload) => ({
  type: actionTypes.SAVE_ALLCODE_SCHEDULE_HOURS_SUCCESS,
  payload,
});

export const saveScheduleHoursFailed = (payload) => ({
  type: actionTypes.SAVE_ALLCODE_SCHEDULE_HOURS_FAIL,
  payload,
});

//get schedule hours
export const getScheduleDoctorByDateStart = (doctorId, date) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.GET_SCHEDULE_DOCTOR_BY_DATE_START });
      let res = await getScheduleDoctorByDate(doctorId, date);
      if (res.status === 200) {
        dispatch(getScheduleDoctorByDateSuccess(res));
      } else {
        dispatch(getScheduleDoctorByDateFailed(res));
      }
    } catch (error) {
      console.log(error);
      dispatch(getScheduleDoctorByDateFailed(error));
    }
  };
};

export const getScheduleDoctorByDateSuccess = (payload) => ({
  type: actionTypes.GET_SCHEDULE_DOCTOR_BY_DATE_SUCCESS,
  payload,
});

export const getScheduleDoctorByDateFailed = (payload) => ({
  type: actionTypes.GET_SCHEDULE_DOCTOR_BY_DATE_FAIL,
  payload,
});

//get extra info doctor by id
export const getExtraInfoDoctorByIdStart = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.GET_EXTRA_INFO_DOCTOR_BY_ID_START });
      let res = await getExtraInfoDoctorByIdService(id);
      if (res.status === 200) {
        dispatch(getExtraInfoDoctorByIdSuccess(res));
      } else {
        dispatch(getExtraInfoDoctorByIdFailed(res));
      }
    } catch (error) {
      dispatch(getExtraInfoDoctorByIdFailed(error));
    }
  };
};

export const getExtraInfoDoctorByIdSuccess = (payload) => ({
  type: actionTypes.GET_EXTRA_INFO_DOCTOR_BY_ID_SUCCESS,
  payload,
});

export const getExtraInfoDoctorByIdFailed = (payload) => ({
  type: actionTypes.GET_EXTRA_INFO_DOCTOR_BY_ID_FAIL,
  payload,
});

//book an appointment with
export const bookAppointmentStart = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.BOOK_APPOINTMENT_WITH_DOCTOR_START });
      let res = await bookAppointmentService(id);
      if (res.status === 200) {
        dispatch(bookAppointmentSuccess(res));
        toast.success(res.message);
      }
    } catch (error) {
      dispatch(bookAppointmentFailed(error));
      toast.error(error.response.data.message);
    }
  };
};

export const bookAppointmentSuccess = (payload) => ({
  type: actionTypes.BOOK_APPOINTMENT_WITH_DOCTOR_SUCCESS,
  payload,
});

export const bookAppointmentFailed = (payload) => ({
  type: actionTypes.BOOK_APPOINTMENT_WITH_DOCTOR_FAIL,
  payload,
});

//get all specialty
export const getAllSpecialtyStart = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.GET_ALL_SPECIALTY_START });
      let res = await getAllSpecialtyService();
      if (res.status === 200) {
        dispatch(getAllSpecialtySuccess(res));
      }
    } catch (error) {
      dispatch(getAllSpecialtyFailed(error));
    }
  };
};

export const getAllSpecialtySuccess = (payload) => ({
  type: actionTypes.GET_ALL_SPECIALTY_SUCCESS,
  payload,
});

export const getAllSpecialtyFailed = (payload) => ({
  type: actionTypes.GET_ALL_SPECIALTY_FAIL,
  payload,
});
