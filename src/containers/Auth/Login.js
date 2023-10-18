import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import { KeyCodeUtils, LanguageUtils } from "../../utils";

import userIcon from "../../../src/assets/images/user.svg";
import passIcon from "../../../src/assets/images/pass.svg";
import "./Login.scss";
import { FormattedMessage } from "react-intl";

import { handleLoginApi, adminService } from "../../services";
// import userService from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.btnLogin = React.createRef();
  }

  initialState = {
    username: undefined,
    password: undefined,
    loginError: "",
    isShowPassword: false,
    errMessage: "",
  };

  state = {
    ...this.initialState,
  };

  refresh = () => {
    this.setState({
      ...this.initialState,
    });
  };

  onUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  onPasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  redirectToSystemPage = () => {
    const { navigate } = this.props;
    const redirectPath = "/system/user-manage";
    navigate(`${redirectPath}`);
  };

  processLogin = async () => {
    const { username, password } = this.state;
    const { userLoginSusscess } = this.props;

    this.setState({ errMessage: "" });
    try {
      const { data } = await handleLoginApi(username, password);
      if (data.status === 200) {
        userLoginSusscess(data.dataUser);
        this.redirectToSystemPage();
      }
    } catch (error) {
      if (error.response.data) {
        this.setState({ errMessage: error.response.data.message });
      }
    }
  };

  handleKeyDown = (event) => {
    const keyCode = event.which || event.keyCode;
    if (keyCode === KeyCodeUtils.ENTER) {
      event.preventDefault();
      if (!this.btnLogin.current || this.btnLogin.current.disabled) return;
      this.btnLogin.current.click();
    }
  };

  handleShowHidePassword = () => {
    this.setState({ isShowPassword: !this.state.isShowPassword });
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    const { username, password } = this.state;
    const { lang } = this.props;
    return (
      <div className="login-wrapper">
        <div className="login-container">
          <div className="form_login">
            <h2 className="title">
              <FormattedMessage id="login.login" />
            </h2>
            <div className="form-group icon-true">
              <img className="icon" src={userIcon} alt="this" />
              <input
                placeholder={LanguageUtils.getMessageByKey(
                  "login.username",
                  lang
                )}
                id="username"
                name="username"
                type="text"
                className="form-control"
                value={username}
                onChange={this.onUsernameChange}
              />
            </div>

            <div id="phone-input-container" className="form-group icon-true">
              <img className="icon" src={passIcon} alt="this" />
              <input
                placeholder={LanguageUtils.getMessageByKey(
                  "login.password",
                  lang
                )}
                id="password"
                name="password"
                type={this.state.isShowPassword ? "text" : "password"}
                className="form-control"
                value={password}
                onChange={this.onPasswordChange}
              />
              <span onClick={this.handleShowHidePassword}>
                <i
                  className={
                    this.state.isShowPassword
                      ? "fas fa-eye-slash"
                      : "fas fa-eye"
                  }
                ></i>
              </span>
            </div>
            <div className="" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>

            {/* {loginError !== "" && (
              <div className="login-error">
                <span className="login-error-message">{loginError}</span>
              </div>
            )} */}

            <div className="form-group login">
              <input
                ref={this.btnLogin}
                id="btnLogin"
                type="submit"
                className="btn"
                value={LanguageUtils.getMessageByKey("login.login", lang)}
                onClick={this.processLogin}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSusscess: (UserInfo) =>
      dispatch(actions.userLoginSusscess(UserInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
