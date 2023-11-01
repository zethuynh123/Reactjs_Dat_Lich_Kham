import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getDetailDoctorStart,
  getScheduleDoctorByDateStart,
} from "../../../store/actions/adminActions";
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
    const { getScheduleDoctorByDateStart, doctorId } = this.props;

    if (doctorId) {
      await getScheduleDoctorByDateStart(doctorId, e.target.value);
    }
  };

  toggle = () => {
    this.setState({ modalBooking: !this.state.modalBooking });
  };

  handleClickScheduleTime = (time) => {
    this.setState({ modalBooking: !this.state.modalBooking, dataModal: time });
  };

  async componentDidMount() {
    const { getScheduleDoctorByDateStart, doctorId } = this.props;
    let allDays = this.handleSetArrDays();
    if (allDays?.length > 0) {
      await getScheduleDoctorByDateStart(doctorId, allDays[0]?.value);
      this.setState({ allDays });
    }
  }

  componentDidUpdate(prevProps) {
    const { language, ScheduleByDate } = this.props;

    if (prevProps.language !== language) {
      let allDays = this.handleSetArrDays();
      this.setState({ allDays });
    }
    if (prevProps.ScheduleByDate !== ScheduleByDate) {
      if (ScheduleByDate.status === 200) {
        this.setState({ allAvailableTime: ScheduleByDate.data });
      } else {
        console.error(ScheduleByDate.message);
      }
    }
  }

  render() {
    const { allDays, allAvailableTime, dataModal } = this.state;
    const { language, detailInfoDoctors } = this.props;
    return (
      <>
        <BookingModal
          modal={this.state.modalBooking}
          toggle={() => this.toggle()}
          dataModal={dataModal}
          detailInfoDoctors={detailInfoDoctors}
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
    ScheduleByDate: state.admin.ScheduleByDate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailDoctorStart: (id) => dispatch(getDetailDoctorStart(id)),
    getScheduleDoctorByDateStart: (doctorId, date) =>
      dispatch(getScheduleDoctorByDateStart(doctorId, date)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
