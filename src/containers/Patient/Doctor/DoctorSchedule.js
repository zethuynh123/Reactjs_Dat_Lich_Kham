import React, { Component } from "react";
import { connect } from "react-redux";
import { getScheduleDoctorByDate } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import localization from "moment/locale/vi";
import "./DoctorSchedule.scss";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import BookingModal from "./Modal/BookingModal";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTime: [],
      dataModal: [],
      modalBooking: false,
    };
  }

  handleSetArrDays = () => {
    const { language } = this.props;
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};

      if (language === LANGUAGES.VI) {
        object.label = moment(new Date()).add(i, "days").format("dddd - DD/MM");
      } else {
        object.label = moment(new Date())
          .add(i, "days")
          .locale("en")
          .format("dddd - DD/MM");
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }
    return allDays;
  };

  handleChangeSelect = async (e) => {
    const { doctorId } = this.props;

    if (doctorId) {
      let result = await getScheduleDoctorByDate(doctorId, e.target.value);
      if (result.status === 200) {
        this.setState({ allAvailableTime: result?.data });
      } else {
        console.error(result?.message);
      }
    }
  };

  toggle = () => {
    this.setState({ modalBooking: !this.state.modalBooking });
  };

  handleClickScheduleTime = (time) => {
    this.setState({ modalBooking: !this.state.modalBooking, dataModal: time });
  };

  async componentDidMount() {
    const { doctorId } = this.props;
    let allDays = this.handleSetArrDays();
    if (allDays?.length > 0) {
      let result = await getScheduleDoctorByDate(doctorId, allDays[0]?.value);
      this.setState({ allDays, allAvailableTime: result?.data });
    }
  }

  async componentDidUpdate(prevProps) {
    const { language, doctorId } = this.props;

    if (prevProps.language !== language) {
      let allDays = this.handleSetArrDays();
      this.setState({ allDays });
    }

    if (prevProps.doctorId !== doctorId) {
      let allDays = this.handleSetArrDays();
      if (allDays?.length > 0) {
        let result = await getScheduleDoctorByDate(doctorId, allDays[0]?.value);
        this.setState({ allDays, allAvailableTime: result?.data });
      }
    }
  }

  render() {
    const { allDays, allAvailableTime, dataModal } = this.state;
    const { language, detailInfoDoctors, doctorId } = this.props;
    return (
      <>
        <BookingModal
          modal={this.state.modalBooking}
          toggle={() => this.toggle()}
          dataModal={dataModal}
          detailInfoDoctors={detailInfoDoctors}
          doctorId={doctorId && doctorId}
        />
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select
              className="text-capitalize"
              onChange={this.handleChangeSelect}
            >
              {allDays?.length > 0 &&
                allDays.map((item, index) => {
                  if (index === 0) {
                    let label = moment(new Date()).format("DD/MM");
                    let today = language === LANGUAGES.VI ? "Hôm nay" : "Today";
                    return (
                      <option value={item.value} key={index}>
                        {`${today} - ${label}`}
                      </option>
                    );
                  }
                  return (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available-time">
            <div className="text-calendar my-2">
              <span
                className=" text-uppercase fw-bold "
                style={{ color: "#333" }}
              >
                <i className="fas fa-calendar-alt me-2 "></i>
                <FormattedMessage id="patient.detail_doctor.doctor_schedule" />
              </span>
            </div>
            <div className="time-content justify-content-between flex-column ">
              {allAvailableTime?.length > 0 ? (
                <>
                  <div className="d-flex flex-wrap gap-2">
                    {allAvailableTime.map((item, index) => {
                      let time =
                        language === LANGUAGES.VI
                          ? item.timeTypeData.valueVi
                          : item.timeTypeData.valueEn;
                      return (
                        <button
                          className="btn fw-bold py-2"
                          key={index}
                          style={
                            language === LANGUAGES.EN
                              ? { minWidth: "157px" }
                              : null
                          }
                          onClick={() => this.handleClickScheduleTime(item)}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="fst-italic">
                  {<FormattedMessage id="patient.detail_doctor.no_schedule" />}
                </div>
              )}
              {allAvailableTime?.length > 0 && (
                <div className="mt-2">
                  <span>
                    <FormattedMessage id="patient.detail_doctor.choose" />{" "}
                    <i className="far fa-hand-point-up"></i>{" "}
                    <FormattedMessage id="patient.detail_doctor.book_free" />
                  </span>
                </div>
              )}
            </div>
          </div>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
