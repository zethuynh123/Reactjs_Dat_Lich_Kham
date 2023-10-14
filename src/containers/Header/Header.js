import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageWeb } from "../../store/actions/appActions";
import { FormattedMessage } from "react-intl";
import "./Header.scss";

class Header extends Component {
  handleChangeLanguage = (language) => {
    this.props.changeLanguageWeb(language);
  };

  render() {
    const { processLogout, language, userInfo } = this.props;

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={adminMenu} />
        </div>

        <div className="languages">
          <span className="welcome me-3">
            <FormattedMessage id={"home_header.welcome"} />,{" "}
            {userInfo && userInfo.firstName ? userInfo.firstName : ""}!
          </span>
          <span
            className={language === "vi" ? "language-vi active" : "language-vi"}
            onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
          >
            VN
          </span>
          <span
            className={language === "en" ? "language-en active" : "language-en"}
            onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
          >
            EN
          </span>
          {/* nút logout */}
          <div
            className="btn btn-logout"
            onClick={processLogout}
            title="Log out"
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageWeb: (language) => dispatch(changeLanguageWeb(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
