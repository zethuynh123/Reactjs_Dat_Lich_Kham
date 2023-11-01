import React, { Component } from "react";
import { connect } from "react-redux";
import { getExtraInfoDoctorByIdStart } from "../../../store/actions/adminActions";
import NumberFormat from "react-number-format";
import { FormattedMessage } from "react-intl";
import "./ProfileDoctor.scss";
import { LANGUAGES } from "../../../utils";
import _ from "lodash";
import moment from "moment";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorProfile: [],
    };
  }

  // componentWillReceiveProps(nextProps, prevState) {
  //     const { location, setAccountMenuPath, setSettingMenuPath } = this.props;
  //     const { location: nextLocation } = nextProps;
  //     if (location !== nextLocation) {
  //         let pathname = nextLocation && nextLocation.pathname;
  //         if ((pathname.startsWith('/account/') || pathname.startsWith('/fds/account/'))) {
  //             setAccountMenuPath(pathname);
  //         }
  //         if (pathname.startsWith('/settings/')) {
  //             setSettingMenuPath(pathname);
  //         };
  //     };
  // };

  renderTimeBooking = (dataTime) => {
    const { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime?.timeTypeData?.valueVi
          : dataTime?.timeTypeData?.valueEn;
      let date =
        language === LANGUAGES.VI
          ? moment
              .unix(Number(dataTime.date) / 1000)
              .format("dddd - DD/MM/YYYY")
          : moment
              .unix(Number(dataTime.date) / 1000)
              .locale("en")
              .format("dddd - MM/DD/YYYY");
      return (
        <>
          <div className="text-capitalize">
            {time} - {date}
          </div>
          <div>Miễn phí đặt lịch</div>
        </>
      );
    }
    return <></>;
  };

  async componentDidMount() {
    const { detailInfoDoctors } = this.props;
    if (detailInfoDoctors) {
      this.setState({ doctorProfile: detailInfoDoctors });
    }
  }

  componentDidUpdate(prevProps) {
    const { language, detailInfoDoctors } = this.props;

    // if (prevProps.detailInfoDoctors !== detailInfoDoctors) {
    //   this.setState({ doctorProfile: detailInfoDoctors });
    // }
  }

  render() {
    const { doctorProfile } = this.state;
    const { language, isShowDescription, dataTime } = this.props;
    console.log("doctorProfile", doctorProfile, dataTime);
    let nameVi = "",
      nameEn = "";

    if (doctorProfile && doctorProfile.positionData) {
      nameVi = `${doctorProfile.positionData.valueVi}, ${doctorProfile.lastName} ${doctorProfile.firstName}`;
      nameEn = `${doctorProfile.positionData.valueEn}, ${doctorProfile.firstName} ${doctorProfile.lastName}`;
    }
    return (
      <>
        <div className="introduce-doctor">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${
                doctorProfile?.image && doctorProfile.image
              })`,
            }}
          ></div>
          <div className="content-right">
            <div className="name-doctor">
              {language === LANGUAGES.VI ? nameVi : nameEn}
            </div>
            <div className="info-doctor">
              {isShowDescription ? (
                doctorProfile?.Markdown?.description && (
                  <span>{doctorProfile.Markdown.description}</span>
                )
              ) : (
                <>{this.renderTimeBooking(dataTime)}</>
              )}
            </div>
          </div>
        </div>
        <div className="examination-price">
          Giá khám:{" "}
          {language === LANGUAGES.VI ? (
            <NumberFormat
              value={doctorProfile?.Doctor_Infor?.priceTypeData?.valueVi}
              displayType={"text"}
              thousandSeparator={true}
              suffix={"vnđ"}
            />
          ) : (
            <NumberFormat
              value={doctorProfile?.Doctor_Infor?.priceTypeData?.valueEn}
              displayType={"text"}
              thousandSeparator={true}
              suffix={"$"}
            />
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getExtraInfoDoctorByIdStart: (id) =>
      dispatch(getExtraInfoDoctorByIdStart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
