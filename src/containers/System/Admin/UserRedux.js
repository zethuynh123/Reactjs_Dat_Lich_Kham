import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { addNewUserStart } from "../../../store/actions/adminActions";
import { LANGUAGES, CommonUtils } from "../../../utils";
import {
  fetchGenderStart,
  fetchPositionStart,
  fetchRoleStart,
  getAllUserStart,
  editUserStart,
} from "../../../store/actions/adminActions";
import TableUserManage from "./TableUserManage";
import Lightbox from "react-image-lightbox";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-image-lightbox/style.css";
import "./UserRedux.scss";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderOption: [],
      positionOption: [],
      roleOption: [],
      previewImg: "",
      isOpen: false,
      userId: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "M",
      roleId: "R1",
      position: "P0",
      errors: {},
      isEditing: false,
    };
  }

  errObject = {
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
    address: "",
    phoneNumber: "",
    roleId: "",
    previewImg: "",
    position: "",
    errors: {},
  };

  reset = () => {
    this.setState({
      toastId: null,
      isLoading: false,
      modal: false,
      userId: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "M",
      roleId: "R1",
      position: "P0",
      previewImg: "",
      errors: {},
      isEditing: false,
    });
  };

  checkValidateInput = async (e) => {
    e.preventDefault();
    let error = false;
    let errorObj = { ...this.errObject };

    if (!this.state.email || this.state.email === "") {
      errorObj.email = "Missing the email";
      error = true;
    }
    if (!this.state.firstName || this.state.firstName === "") {
      errorObj.firstName = "Missing the first name";
      error = true;
    }

    if (
      (!this.state.password || this.state.password === "") &&
      !this.state.isEditing
    ) {
      errorObj.password = "Missing the password";
      error = true;
    }
    if (!this.state.lastName || this.state.lastName === "") {
      errorObj.lastName = "Missing the last name";
      error = true;
    }
    if (!this.state.address || this.state.address === "") {
      errorObj.address = "Missing the address";
      error = true;
    }
    if (!this.state.gender || this.state.gender === "") {
      errorObj.gender = "Missing the gender";
      error = true;
    }
    if (!this.state.phoneNumber || this.state.phoneNumber === "") {
      errorObj.phoneNumber = "Missing the phone number";
      error = true;
    }
    if (!this.state.roleId || this.state.roleId === "") {
      errorObj.roleId = "Missing the role";
      error = true;
    }
    if (!this.state.position || this.state.position === "") {
      errorObj.position = "Missing the position";
      error = true;
    }
    // if (!this.state.previewImg || this.state.previewImg === "") {
    //   errorObj.previewImg = "Missing the image";
    //   error = true;
    // }

    this.setState({ errors: errorObj });
    if (error) {
      return null;
    } else {
      this.state.isEditing
        ? await this.handleEditUser()
        : await this.handleAddUser();
      await this.props.getAllUserStart("All");
      this.setState({ errors: {} });
    }
  };

  handleAddUser = async () => {
    this.setState({ isLoading: true });
    let data = {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      gender: this.state.gender,
      roleId: this.state.roleId,
      position: this.state.position,
      image: this.state.previewImg,
    };

    await this.props.addNewUserStart(data);
    this.reset();
  };

  handleEditUser = async () => {
    this.setState({ isLoading: true });
    let data = {
      id: this.state.userId,
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      gender: this.state.gender,
      roleId: this.state.roleId,
      position: this.state.position,
      image: this.state.previewImg,
    };

    await this.props.editUserStart(data);
    this.reset();
  };

  async componentDidMount() {
    this.props.fetchGenderStart();
    this.props.fetchPositionStart();
    this.props.fetchRoleStart();
  }

  componentDidUpdate(prevProps, prevState) {
    const { dataAddUser, genders, positions, roles } = this.props;
    // const PreviewImageElement =
    //   document.getElementsByClassName("preview-image");

    if (prevProps.genders !== genders) {
      this.setState({ genderOption: genders });
    }
    if (prevProps.positions !== positions) {
      this.setState({ positionOption: positions });
    }
    if (prevProps.roles !== roles) {
      this.setState({ roleOption: roles });
    }
    if (dataAddUser && prevProps.dataAddUser !== dataAddUser) {
      if (dataAddUser && dataAddUser.status === 200) {
        this.setState({ isLoading: false });
        toast.success(dataAddUser.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          closeOnClick: true,
          closeButton: false,
        });
        // this.props.getAllUser();
      } else {
        this.setState({ isLoading: false });
        toast.error(dataAddUser.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          closeOnClick: true,
          closeButton: false,
        });
      }
    }
  }

  handleDeleteImage = (e) => {
    e.stopPropagation();
    this.state.previewImg !== "" && this.setState({ previewImg: "" });
  };

  handleChooseUserToEdit = (userInfo) => {
    if (userInfo) {
      let imageBase64 = "";
      if (userInfo.image) {
        imageBase64 = new Buffer(userInfo.image, "base64").toString("binary");
      }
      this.setState({
        userId: userInfo.id,
        isEditing: true,
        email: userInfo.email,
        password: "passIsDisabled",
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        address: userInfo.address,
        phoneNumber: userInfo.phoneNumber,
        gender: userInfo.gender,
        roleId: userInfo.roleId,
        position: userInfo.positionId,
        previewImg: imageBase64,
      });
    }
  };

  handleChangeImage = async (e) => {
    let data = e.target.files;
    let file = data[0];

    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({ previewImg: base64 });
    }
  };

  render() {
    const {
      genderOption,
      positionOption,
      roleOption,
      previewImg,
      isOpen,
      email,
      password,
      address,
      firstName,
      gender,
      lastName,
      phoneNumber,
      position,
      roleId,
    } = this.state;
    const { language, dataAddUser } = this.props;
    return (
      <div className="user-redux-container">
        <div className="title">
          <div className="text-center">
            <FormattedMessage id="manage-user.add" />
          </div>
        </div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <form className="row g-3">
                <div className="col-md-3">
                  <label className="form-label">
                    <FormattedMessage id="manage-user.email" />
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => this.setState({ email: e.target.value })}
                    disabled={this.state.isEditing ? true : false}
                  />
                  {this.state.errors.email && (
                    <div className="text-danger">{this.state.errors.email}</div>
                  )}
                </div>
                <div className="col-md-3">
                  <label className="form-label">
                    <FormattedMessage id="manage-user.password" />
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                    disabled={this.state.isEditing ? true : false}
                  />
                  {this.state.errors.password && (
                    <div className="text-danger">
                      {this.state.errors.password}
                    </div>
                  )}
                </div>
                <div className="col-md-3">
                  <label className="form-label">
                    <FormattedMessage id="manage-user.firstName" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={firstName}
                    placeholder="First name"
                    onChange={(e) =>
                      this.setState({ firstName: e.target.value })
                    }
                  />
                  {this.state.errors.firstName && (
                    <div className="text-danger">
                      {this.state.errors.firstName}
                    </div>
                  )}
                </div>
                <div className="col-md-3">
                  <label className="form-label">
                    <FormattedMessage id="manage-user.lastName" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={lastName}
                    placeholder="Last name"
                    onChange={(e) =>
                      this.setState({ lastName: e.target.value })
                    }
                  />
                  {this.state.errors.lastName && (
                    <div className="text-danger">
                      {this.state.errors.lastName}
                    </div>
                  )}
                </div>
                <div className="col-md-3">
                  <label className="form-label">
                    <FormattedMessage id="manage-user.phoneNumber" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={phoneNumber}
                    placeholder="Phone number"
                    onChange={(e) =>
                      this.setState({ phoneNumber: e.target.value })
                    }
                  />
                  {this.state.errors.phoneNumber && (
                    <div className="text-danger">
                      {this.state.errors.phoneNumber}
                    </div>
                  )}
                </div>
                <div className="col-md-9">
                  <label className="form-label">
                    <FormattedMessage id="manage-user.address" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={address}
                    placeholder="Address"
                    onChange={(e) => this.setState({ address: e.target.value })}
                  />
                  {this.state.errors.address && (
                    <div className="text-danger">
                      {this.state.errors.address}
                    </div>
                  )}
                </div>
                <div className="col-md-3">
                  <label className="form-label">
                    <FormattedMessage id="manage-user.sex" />
                  </label>
                  <select
                    className="form-select"
                    value={gender}
                    onChange={(e) => this.setState({ gender: e.target.value })}
                  >
                    {genderOption &&
                      genderOption.length > 0 &&
                      genderOption.map((gender, index) => {
                        return (
                          <option key={index} value={gender.keyMap}>
                            {language === LANGUAGES.VI
                              ? gender.valueVi
                              : gender.valueEn}
                          </option>
                        );
                      })}
                  </select>
                  {this.state.errors.gender && (
                    <div className="text-danger">
                      {this.state.errors.gender}
                    </div>
                  )}
                  <div className="mt-2">
                    <button
                      type="submit"
                      className={
                        this.state.isEditing
                          ? "btn btn-warning"
                          : "btn btn-primary"
                      }
                      style={{ color: this.state.isEditing ? "white" : "" }}
                      onClick={(e) => this.checkValidateInput(e)}
                    >
                      {this.state.isEditing ? (
                        <FormattedMessage id="manage-user.save-change" />
                      ) : (
                        <FormattedMessage id="manage-user.save" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="col-md-3">
                  <label className="form-label">
                    <FormattedMessage id="manage-user.position" />
                  </label>
                  <select
                    className="form-select"
                    value={position}
                    onChange={(e) =>
                      this.setState({ position: e.target.value })
                    }
                  >
                    {positionOption &&
                      positionOption.length > 0 &&
                      positionOption.map((position, index) => {
                        return (
                          <option key={index} value={position.keyMap}>
                            {language === LANGUAGES.VI
                              ? position.valueVi
                              : position.valueEn}
                          </option>
                        );
                      })}
                  </select>
                  {this.state.errors.position && (
                    <div className="text-danger">
                      {this.state.errors.position}
                    </div>
                  )}
                </div>
                <div className="col-md-3">
                  <label className="form-label">
                    <FormattedMessage id="manage-user.role" />
                  </label>
                  <select
                    className="form-select"
                    value={roleId}
                    onChange={(e) => this.setState({ roleId: e.target.value })}
                  >
                    {roleOption &&
                      roleOption.length > 0 &&
                      roleOption.map((role, index) => {
                        return (
                          <option key={index} value={role.keyMap}>
                            {language === LANGUAGES.VI
                              ? role.valueVi
                              : role.valueEn}
                          </option>
                        );
                      })}
                  </select>
                  {this.state.errors.roleId && (
                    <div className="text-danger">
                      {this.state.errors.roleId}
                    </div>
                  )}
                </div>
                <div className="col-md-3">
                  <label className="form-label">
                    <FormattedMessage id="manage-user.image" />
                  </label>

                  <div className="preview-img-container">
                    <input
                      type="file"
                      id="previewImg"
                      hidden
                      onChange={this.handleChangeImage}
                    />
                    <label className="label-upload" htmlFor="previewImg">
                      <FormattedMessage id="manage-user.upload" />{" "}
                      <i className="fas fa-upload"></i>
                    </label>
                    <div className="d-flex">
                      <div
                        className="preview-image mt-2"
                        style={{
                          background: `center / contain no-repeat url(${previewImg})`,
                          cursor: previewImg ? "pointer" : "default",
                        }}
                        onClick={() =>
                          previewImg !== "" && this.setState({ isOpen: true })
                        }
                      >
                        {previewImg !== "" ? (
                          <span
                            className="preImage-close-icon"
                            onClick={this.handleDeleteImage}
                          >
                            {" "}
                            <i class="fas fa-times"></i>
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <TableUserManage
              handleChooseUserToEdit={(data) =>
                this.handleChooseUserToEdit(data)
              }
            />
          </div>
        </div>
        {isOpen && (
          <Lightbox
            mainSrc={previewImg}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
    positions: state.admin.positions,
    roles: state.admin.roles,
    dataAddUser: state.admin.dataAddUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGenderStart: () => dispatch(fetchGenderStart()),
    fetchPositionStart: () => dispatch(fetchPositionStart()),
    fetchRoleStart: () => dispatch(fetchRoleStart()),
    addNewUserStart: (data) => dispatch(addNewUserStart(data)),
    getAllUserStart: () => dispatch(getAllUserStart()),
    editUserStart: (data) => dispatch(editUserStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
