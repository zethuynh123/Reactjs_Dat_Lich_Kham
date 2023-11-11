import React, { Component } from "react";
import { connect } from "react-redux";
import { getExtraInfoDoctorByIdStart } from "../../../store/actions/adminActions";
import { getDetailDoctorService } from "../../../services/userService";
import NumberFormat from "react-number-format";
import { FormattedMessage } from "react-intl";
import "./ProfileDoctor.scss";
import { LANGUAGES } from "../../../utils";
import _ from "lodash";
import { Link } from "react-router-dom";
import moment from "moment";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorProfile: [],
    };
  }

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
          <div>
            <FormattedMessage id="patient.booking_modal.free_booking" />
          </div>
        </>
      );
    }
    return <></>;
  };

  async componentDidMount() {
    const { detailInfoDoctors, doctorId } = this.props;

    if (detailInfoDoctors) {
      this.setState({ doctorProfile: detailInfoDoctors });
    }

    if (doctorId) {
      let result = await getDetailDoctorService(doctorId);
      if (result.status === 200) {
        this.setState({ doctorProfile: result.data });
      }
    }
  }

  async componentDidUpdate(prevProps) {
    const { doctorId } = this.props;

    if (prevProps.doctorId !== doctorId) {
      let result = await getDetailDoctorService(doctorId);
      if (result.status === 200) {
        this.setState({ doctorProfile: result.data });
      }
    }
  }

  render() {
    const { doctorProfile } = this.state;
    const {
      language,
      isShowDescription,
      dataTime,
      isShowDetailDoctor,
      isShowPrice,
      doctorId,
    } = this.props;
    let nameVi = "",
      nameEn = "";

    if (doctorProfile && doctorProfile.positionData) {
      nameVi = `${doctorProfile.positionData.valueVi}, ${doctorProfile.lastName} ${doctorProfile.firstName}`;
      nameEn = `${doctorProfile.positionData.valueEn}, ${doctorProfile.firstName} ${doctorProfile.lastName}`;
      // language === LANGUAGES.VI
      //   ? this.props.handlePassDoctorName(nameVi)
      //   : this.props.handlePassDoctorName(nameEn);
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
        {isShowDetailDoctor && (
          <div>
            <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
          </div>
        )}
        {isShowPrice && (
          <div className="examination-price">
            <FormattedMessage id="patient.booking_modal.price_examination" />:{" "}
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
        )}
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
