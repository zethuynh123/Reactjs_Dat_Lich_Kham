import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  addNewUser,
  getAllUser,
  deleteUser,
  editUser,
  fetchTopDoctorService,
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
