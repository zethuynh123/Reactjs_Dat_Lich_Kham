import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import {
  getAllUserStart,
  deleteUserStart,
  fetchAllDoctorStart,
  saveDetailDoctorStart,
  getDetailDoctorStart,
  fetchAllScheduleHoursStart,
} from "../../../store/actions/adminActions";
import { LANGUAGES } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import FormattedDate from "../../../components/Formating/FormattedDate";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDoctor: "",
      listDoctor: [],
      selectedDate: new Date(),
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
      this.setState({ rangeTime: this.props.timeData });
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
    // await this.props.getDetailDoctorStart(selectedDoctor.value);
  };

  handleChangeDatePicker = async (date) => {
    this.setState({ selectedDate: date[0] });
  };

  render() {
    const { listDoctor, rangeTime } = this.state;
    const { language } = this.props;
    console.log(this.props.timeData);
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
                  minDate={new Date()}
                />
              </div>
              <div className="col-12 pick-hour-container d-flex gap-4 py-4 mt-3 flex-wrap ">
                {rangeTime &&
                  rangeTime.length > 0 &&
                  rangeTime.map((time, index) => {
                    return (
                      <button className="btn btn-outline-secondary" key={index}>
                        {language === LANGUAGES.VI
                          ? time.valueVi
                          : time.valueEn}
                      </button>
                    );
                  })}
              </div>
            </div>
            <button className="btn btn-primary">
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
