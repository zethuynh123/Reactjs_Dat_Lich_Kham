import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import {
  fetchAllDoctorStart,
  getDetailDoctorStart,
  fetchAllScheduleHoursStart,
  saveScheduleHoursStart,
} from "../../../store/actions/adminActions";
import { LANGUAGES, dateFormat } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import FormattedDate from "../../../components/Formating/FormattedDate";
import { toast } from "react-toastify";
import _ from "lodash";
import moment from "moment";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDoctor: "",
      listDoctor: [],
      selectedDate: "",
      rangeTime: [],
    };
  }

  async componentDidMount() {
    this.props.fetchAllDoctorStart();
    this.props.fetchAllScheduleHoursStart();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.allDoctors !== this.props.allDoctors ||
      prevProps.language !== this.props.language
    ) {
      let listDoctor = this.handleConvertArrToOptionsSelect(
        this.props.allDoctors
      );
      if (listDoctor && listDoctor.length > 0) {
        this.setState({ listDoctor });
      }
    }

    if (prevProps.timeData !== this.props.timeData) {
      let rangeTime = this.props.timeData.map((time) => ({
        ...time,
        isSelected: false,
      }));

      this.setState({ rangeTime });
    }
  }

  handleConvertArrToOptionsSelect = (data) => {
    let result = [];
    let { language } = this.props;
    if (data && data.length > 0) {
      data.map((doctor) => {
        let labelVi = `${doctor.lastName} ${doctor.firstName}`;
        let labelEn = `${doctor.firstName} ${doctor.lastName}`;
        return result.push({
          label: language === LANGUAGES.VI ? labelVi : labelEn,
          value: doctor.id,
        });
      });
    }
    return result;
  };

  handleChange = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
  };

  handleChangeDatePicker = async (date) => {
    this.setState({ selectedDate: date[0] });
  };

  handleClickBtnTime = (time) => {
    const { rangeTime } = this.state;

    let data = rangeTime.map((item) => {
      if (item.id === time.id) {
        item.isSelected = !item.isSelected;
      }
      return item;
    });

    this.setState({ rangeTime: data });
  };

  handleSaveInfo = () => {
    const { rangeTime, selectedDoctor, selectedDate } = this.state;
    let result = [];

    if (!selectedDate || isNaN(selectedDate)) {
      toast.error("Please select a date", {
        closeButton: false,
      });
      return;
    }
    if (_.isEmpty(selectedDoctor)) {
      toast.error("Please select a doctor");
      return;
    }
    let formatedDate = new Date(selectedDate).getTime();
    let selectedTime = rangeTime.filter((time) => time.isSelected === true);

    if (_.isEmpty(selectedTime)) {
      toast.error("Please select a time");
      return;
    } else {
      selectedTime.map((time) => {
        let object = {};
        object.doctorId = selectedDoctor.value;
        object.date = formatedDate.toString();
        object.timeType = time.keyMap;
        return result.push(object);
      });
    }
    this.props.saveScheduleHoursStart(result);
  };

  render() {
    const { listDoctor, rangeTime } = this.state;
    const { language } = this.props;
    return (
      <>
        <div className="manage-schedule-container">
          <div className="ms-title">
            <FormattedMessage id="manage-schedule.title" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-6 form-group">
                <label>
                  {" "}
                  <FormattedMessage id="manage-schedule.choose-doctor" />
                </label>
                <Select
                  value={this.state.selectedDoctor}
                  onChange={this.handleChange}
                  options={listDoctor}
                  isClearable={true}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  {" "}
                  <FormattedMessage id="manage-schedule.choose-date" />
                </label>
                <DatePicker
                  className="form-control"
                  onChange={this.handleChangeDatePicker}
                  value={this.state.selectedDate}
                  minDate={new Date().setHours(0, 0, 0, 0)}
                />
              </div>
              <div className="col-12 pick-hour-container d-flex gap-4 py-4 mt-3 flex-wrap ">
                {rangeTime &&
                  rangeTime.length > 0 &&
                  rangeTime.map((time, index) => {
                    return (
                      <button
                        className={`btn btn-${
                          time.isSelected ? "secondary" : "outline-secondary"
                        }`}
                        key={index}
                        onClick={() => this.handleClickBtnTime(time)}
                      >
                        {language === LANGUAGES.VI
                          ? time.valueVi
                          : time.valueEn}
                      </button>
                    );
                  })}
              </div>
            </div>
            <button className="btn btn-primary" onClick={this.handleSaveInfo}>
              {" "}
              <FormattedMessage id="manage-schedule.save-info" />
            </button>
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
    allDoctors: state.admin.allDoctors,
    timeData: state.admin.timeData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorStart: (id) => dispatch(fetchAllDoctorStart()),
    getDetailDoctorStart: (id) => dispatch(getDetailDoctorStart(id)),
    fetchAllScheduleHoursStart: () => dispatch(fetchAllScheduleHoursStart()),
    saveScheduleHoursStart: (data) => dispatch(saveScheduleHoursStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
