import React, { Component } from "react";
import { connect } from "react-redux";
import { getExtraInfoDoctorByIdStart } from "../../../store/actions/adminActions";
import NumberFormat from "react-number-format";
import { FormattedMessage } from "react-intl";
import DatePicker from "../../../components/Input/DatePicker";
import {
  getListPatientForDoctorService,
  sendRemedyService,
} from "../../../services/userService";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import RemedyModal from "./RemedyModal";
import { toast } from "react-toastify";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      patientData: [],
      isShowRemedeyModal: false,
      dataModal: [],
    };
  }

  handleChangeDatePicker = async (date) => {
    this.setState({ selectedDate: date[0] });
    this.getDataPatient();
  };

  getDataPatient = async (id, date) => {
    const { userInfo } = this.props;
    const { selectedDate } = this.state;
    let formattedDate = moment(selectedDate).startOf("day").valueOf();
    let result = await getListPatientForDoctorService(
      userInfo.id,
      formattedDate
    );
    if (result.status === 200) {
      this.setState({ patientData: result.data });
    }
  };

  handleComfirm = async (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.infoPatientData.email,
      patientName: item.infoPatientData.firstName,
      timeType: item.timeType,
    };
    this.setState({ isShowRemedeyModal: true, dataModal: data });
  };

  toggle = () => {
    this.setState({ isShowRemedeyModal: !this.state.isShowRemedeyModal });
  };

  handleSendRemedy = async (data) => {
    const { dataModal } = this.state;
    try {
      let result = await sendRemedyService({
        ...dataModal,
        ...data,
        language: this.props.language,
      });
      if (result.status === 200) {
        toast.success(result.message);
        this.getDataPatient();
        this.setState({ isShowRemedeyModal: false });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }

    // this.setState({ isShowRemedeyModal: !this.state.isShowRemedeyModal });
  };

  async componentDidMount() {
    this.getDataPatient();
  }

  componentDidUpdate(prevProps) {
    const { language, InfoDoctorById } = this.props;

    if (prevProps.language !== language) {
    }
  }

  render() {
    const { selectedDate, patientData, isShowRemedeyModal, dataModal } =
      this.state;
    const { language, userInfo } = this.props;
    return (
      <>
        <RemedyModal
          modal={isShowRemedeyModal}
          dataModal={dataModal}
          toggle={this.toggle}
          handleSendRemedy={(data) => this.handleSendRemedy(data)}
        />
        <div className="manage-patient-container">
          <div className="title text-center fs-4 fw-bold">
            Quản lý bệnh nhân khám bệnh
          </div>
          <div className="manage-patient-body px-4 mt-2">
            <div className="row">
              <div className="col-4 form-group">
                <label>
                  {" "}
                  <FormattedMessage id="manage-schedule.choose-date" />
                </label>
                <DatePicker
                  className="form-control"
                  onChange={this.handleChangeDatePicker}
                  value={selectedDate}
                  minDate={new Date().setHours(0, 0, 0, 0)}
                />
              </div>
              <div className="manage-patient-table mt-3 col-12">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Họ và tên</th>
                      <th scope="col">Giới tính</th>
                      <th scope="col">Địa chỉ</th>
                      <th scope="col">Thời gian khám</th>
                      <th scope="col">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientData.length > 0 ? (
                      patientData.map((item, index) => {
                        let gender =
                          language === LANGUAGES.VI
                            ? item.infoPatientData.genderData.valueVi
                            : item.infoPatientData.genderData.valueEn;
                        let time =
                          language === LANGUAGES.VI
                            ? item.timeTypeDataPatient.valueVi
                            : item.timeTypeDataPatient.valueEn;
                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.infoPatientData.firstName}</td>
                            <td>{gender}</td>
                            <td>{item.infoPatientData.address}</td>
                            <td>{time}</td>
                            <td>
                              <button
                                className="btn btn-secondary me-2"
                                onClick={() => this.handleComfirm(item)}
                              >
                                {/* <FormattedMessage id="common.close" /> */}
                                Xác nhận
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td className="text-center" colSpan={6}>
                          Chưa có dữ liệu
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
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
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getExtraInfoDoctorByIdStart: (id) =>
      dispatch(getExtraInfoDoctorByIdStart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
