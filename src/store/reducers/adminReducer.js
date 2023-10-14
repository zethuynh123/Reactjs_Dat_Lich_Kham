import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  positions: [],
  roles: [],
  users: [],
  topDoctors: [],
  dataAddUser: null,
  isLoadingGenders: false,
  isLoadingPositions: false,
  isLoadingRoles: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      return {
        ...state,
        genders: null,
        isLoadingGenders: true,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      return {
        ...state,
        genders: action.payload,
        isLoadingGenders: false,
      };
    case actionTypes.FETCH_GENDER_FAIL:
      return {
        ...state,
        genders: null,
        isLoadingGenders: true,
      };
    case actionTypes.FETCH_POSITION_START:
      return {
        ...state,
        positions: null,
        isLoadingPositions: true,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      return {
        ...state,
        positions: action.payload,
        isLoadingPositions: false,
      };
    case actionTypes.FETCH_POSITION_FAIL:
      return {
        ...state,
        positions: null,
        isLoadingPositions: true,
      };
    case actionTypes.FETCH_ROLE_START:
      return {
        ...state,
        roles: null,
        isLoadingRoles: true,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      return {
        ...state,
        roles: action.payload,
        isLoadingRoles: false,
      };
    case actionTypes.FETCH_ROLE_FAIL:
      return {
        ...state,
        roles: null,
        isLoadingRoles: true,
      };
    case actionTypes.ADD_USER_START:
      return {
        ...state,
        dataAddUser: null,
      };
    case actionTypes.ADD_USER_SUCCESS:
      return {
        ...state,
        dataAddUser: action.payload,
      };
    case actionTypes.ADD_USER_FAIL:
      return {
        ...state,
        dataAddUser: action.payload,
      };
    case actionTypes.FETCH_ALL_USER_START:
      return {
        ...state,
        users: null,
      };
    case actionTypes.FETCH_ALL_USER_SUCCESS:
      return {
        ...state,
        users: action.payload.dataUser,
      };
    case actionTypes.FETCH_ALL_USER_FAIL:
      return {
        ...state,
        message: action.payload.message,
      };
    case actionTypes.DELETE_USER_START:
      return {
        ...state,
      };
    case actionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
      };
    case actionTypes.DELETE_USER_FAIL:
      return {
        ...state,
        message: action.payload.message,
      };
    case actionTypes.FETCH_TOP_DOCTOR_START:
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      return {
        ...state,
        topDoctors: action.payload.data,
      };
    case actionTypes.FETCH_TOP_DOCTOR_FAIL:
      return {
        ...state,
        topDoctors: [],
      };
    default:
      return state;
  }
};

export default appReducer;
