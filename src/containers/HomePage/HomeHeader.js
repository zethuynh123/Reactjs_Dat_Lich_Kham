import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageWeb } from "../../store/actions/appActions";

class HomeHeader extends Component {
  handleChangeLanguage = (language) => {
    console.log("aaa", language);
    this.props.changeLanguageWeb(language);
  };

  render() {
    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content d-flex align-items-center justify-content-center">
              <i className="fas fa-bars fs-3 text-secondary"></i>
              <div className="header-logo"></div>
            </div>
            <div className="center-content d-flex justify-content-between align-items-center">
              <div className="child-content">
                <div className="fw-bold">
                  <FormattedMessage id="home_header.specialist" />
                </div>
                <div className="subs-title">
                  {" "}
                  <FormattedMessage id="home_header.find_doctor" />
                </div>
              </div>
              <div className="child-content">
                <div className="fw-bold">
                  <FormattedMessage id="home_header.health_facility" />
                </div>
                <div className="subs-title">
                  <FormattedMessage id="home_header.choose_hospital" />
                </div>
              </div>
              <div className="child-content">
                <div className="fw-bold">
                  <FormattedMessage id="home_header.doctor" />
                </div>
                <div className="subs-title">
                  <FormattedMessage id="home_header.choose_doctor" />
                </div>
              </div>
              <div className="child-content">
                <div className="fw-bold">
                  <FormattedMessage id="home_header.examination_package" />
                </div>
                <div className="subs-title">
                  <FormattedMessage id="home_header.general_health_check" />
                </div>
              </div>
            </div>
            <div className="right-content d-flex justify-content-evenly align-items-center">
              <div className="support  d-flex align-items-center">
                <i className="fas fa-question-circle fs-4"></i>{" "}
                <FormattedMessage id="home_header.support" />
              </div>
              <div className="language d-flex gap-2 fw-bold fs-5">
                <div
                  className={
                    this.props.language === "vi"
                      ? "language-vi active"
                      : "language-vi"
                  }
                >
                  <span onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>
                    VN
                  </span>
                </div>
                <div
                  className={
                    this.props.language === "en"
                      ? "language-en active"
                      : "language-en"
                  }
                >
                  <span onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>
                    EN
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="home-header-banner d-flex flex-column">
          <div className="content-up">
            <div className="title-first">
              {" "}
              <FormattedMessage id="home_header.medical_foundation" />
            </div>
            <div className="title-second">
              {" "}
              <FormattedMessage id="home_header.COMPREHENSIVE_HEALTH_CARE" />
            </div>
            <div className="search">
              <i className="fas fa-search"></i>
              <FormattedMessage id="home_header.search_hospital">
                {(placeholder) => (
                  <input type="text" placeholder={placeholder} />
                )}
              </FormattedMessage>
            </div>
          </div>
          <div className="content-down d-flex justify-content-center">
            <div className="options d-flex justify-content-center align-content-end">
              <div className="option-child d-flex justify-content-end align-items-center flex-column mx-5 d">
                <div className="icon-child d-flex justify-content-center align-items-center p-2 bg-white rounded-circle">
                  <i className="far fa-hospital"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="home_header.examination" />
                  <br />
                  <FormattedMessage id="home_header.speciality_lower" />
                </div>
              </div>
              <div className="option-child d-flex justify-content-end align-items-center flex-column mx-5">
                <div className="icon-child d-flex justify-content-center align-items-center p-2 bg-white rounded-circle">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="home_header.examination_2" />
                  <br />
                  <FormattedMessage id="home_header.remote" />
                </div>
              </div>
              <div className="option-child d-flex justify-content-end align-items-center flex-column mx-5">
                <div className="icon-child d-flex justify-content-center align-items-center p-2 bg-white rounded-circle">
                  <i class="fas fa-notes-medical"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="home_header.examination_3" />
                  <br />
                  <FormattedMessage id="home_header.general" />
                </div>
              </div>
              <div className="option-child d-flex justify-content-end align-items-center flex-column mx-5">
                <div className="icon-child d-flex justify-content-center align-items-center p-2 bg-white rounded-circle">
                  <i class="fas fa-vial"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="home_header.tests" />
                  <br />
                  <FormattedMessage id="home_header.medical" />
                </div>
              </div>
              <div className="option-child d-flex justify-content-end align-items-center flex-column mx-5">
                <div className="icon-child d-flex justify-content-center align-items-center p-2 bg-white rounded-circle">
                  <i class="fas fa-heartbeat"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="home_header.health" />
                  <br />
                  <FormattedMessage id="home_header.mental" />
                </div>
              </div>
              <div className="option-child d-flex justify-content-end align-items-center flex-column mx-5">
                <div className="icon-child d-flex justify-content-center align-items-center p-2 bg-white rounded-circle">
                  <i class="far fa-smile"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="home_header.examination_4" />
                  <br />
                  <FormattedMessage id="home_header.dental" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageWeb: (language) => dispatch(changeLanguageWeb(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
