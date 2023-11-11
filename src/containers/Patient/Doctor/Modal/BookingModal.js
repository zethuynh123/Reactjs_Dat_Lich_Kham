import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchGenderStart,
  getExtraInfoDoctorByIdStart,
  bookAppointmentStart,
} from "../../../../store/actions/adminActions";
import NumberFormat from "react-number-format";
import { FormattedMessage } from "react-intl";
import DatePicker from "../../../../components/Input/DatePicker";
import Select from "react-select";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Spinner,
} from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import "./BookingModal.scss";
import { LANGUAGES } from "../../../../utils";
import _ from "lodash";
import moment from "moment";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthDay: "",
      selectedGender: "",
      doctorId: "",
      genders: [],
      errors: {},
      timeType: "",
      timeString: "",
      doctorName: "",
      isLoading: false,
    };
  }

  errObject = {
    fullName: "",
    phoneNumber: "",
    email: "",
    address: "",
    reason: "",
    birthDay: "",
    selectedGender: "",
    doctorId: "",
  };

  toggle = () => {
    this.props.toggle();
    this.reset();
  };

  checkValidateInput = () => {
    let error = false;
    let errorObj = { ...this.errObject };

    if (!this.state.email || this.state.email === "") {
      errorObj.email = "Missing the email";
      error = true;
    }
    if (!this.state.fullName || this.state.fullName === "") {
      errorObj.fullName = "Missing the full name";
      error = true;
    }

    if (!this.state.selectedGender || this.state.selectedGender === "") {
      errorObj.selectedGender = "Missing the gender";
      error = true;
    }
    if (!this.state.phoneNumber || this.state.phoneNumber === "") {
      errorObj.phoneNumber = "Missing the phone number";
      error = true;
    }
    if (!this.state.birthDay || isNaN(this.state.birthDay)) {
      errorObj.birthDay = "Missing the birthday";
      error = true;
    }

    this.setState({ errors: errorObj });
    if (error) {
      return null;
    } else {
      this.setState({ isLoading: true });
      this.handleBookAppointment();
      this.setState({ errors: {} });
    }
  };

  handleBookAppointment = async () => {
    await this.props.bookAppointmentStart({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: new Date(this.state.birthDay).getTime(),
      selectedGender: this.state.selectedGender.value,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: this.renderTimeBooking(this.props.dataModal),
      doctorName: this.renderDoctorName(this.props.detailInfoDoctors),
    });
    this.setState({ isLoading: false });
  };

  handleChangeDatePicker = async (date) => {
    this.setState({ birthDay: date[0] });
  };

  reset = () => {
    this.setState({
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthDay: "",
      selectedGender: "",
      doctorId: "",
      errors: {},
      timeType: "",
      timeString: "",
      doctorName: "",
    });
  };

  handleConvertAllCodeToOptionsSelect = (data) => {
    let result = [];
    let { language } = this.props;
    if (data && data.length > 0) {
      data.map((item) => {
        return result.push({
          label: language === LANGUAGES.VI ? item.valueVi : item.valueEn,
          value: item.keyMap,
        });
      });
    }
    return result;
  };

  async componentDidMount() {
    const { fetchGenderStart } = this.props;
    await fetchGenderStart();
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

      return `${time} - ${date}`;
    }
    return <></>;
  };

  renderDoctorName = (detailInfoDoctors) => {
    const { language } = this.props;
    if (detailInfoDoctors && !_.isEmpty(detailInfoDoctors)) {
      let name =
        language === LANGUAGES.VI
          ? `${detailInfoDoctors.firstName} ${detailInfoDoctors.lastName}`
          : `${detailInfoDoctors.lastName} ${detailInfoDoctors.firstName}`;

      return name;
    }
    return;
  };

  componentDidUpdate(prevProps) {
    const { language, genders, dataModal, bookAppointment } = this.props;

    if (prevProps.genders !== genders || prevProps.language !== language) {
      let genders = this.handleConvertAllCodeToOptionsSelect(
        this.props.genders
      );
      if (genders && genders.length > 0) {
        this.setState({ genders });
      }
    }

    if (prevProps.dataModal !== dataModal) {
      if (dataModal && !_.isEmpty(dataModal)) {
        this.setState({
          doctorId: dataModal.doctorId,
          timeType: dataModal.timeType,
        });
      }
    }
    if (prevProps.bookAppointment !== bookAppointment) {
      if (bookAppointment?.status === 200) {
        this.toggle();
      }
      return;
    }
  }

  render() {
    const {
      fullName,
      phoneNumber,
      email,
      address,
      reason,
      birthDay,
      genders,
      selectedGender,
      isLoading,
    } = this.state;
    const { language, detailInfoDoctors, dataModal, doctorId } = this.props;
    return (
      <Modal
        isOpen={this.props.modal}
        toggle={() => this.toggle()}
        style={{ height: "100px" }}
        centered
        size="lg"
        className="modal-booking"
      >
        <ModalHeader
          className="text-secondary py-0 px-3"
          toggle={() => this.toggle()}
        >
          <span className="fs-3 fw-bold">
            <FormattedMessage id="patient.booking_modal.title" />
          </span>
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="doctor-info">
              <ProfileDoctor
                detailInfoDoctors={detailInfoDoctors && detailInfoDoctors}
                dataTime={dataModal && dataModal}
                isShowDescription={false}
                isShowDetailDoctor={false}
                isShowPrice={true}
                doctorId={doctorId}
              />
            </div>
            <div className="row">
              <Form>
                <Row className="mb-2">
                  <Col md={6}>
                    <FormGroup>
                      <FormattedMessage id="patient.booking_modal.full_name">
                        {(placeholder) => {
                          return (
                            <>
                              <Label> {placeholder}</Label>
                              <Input
                                name="fullName"
                                placeholder={placeholder}
                                value={fullName}
                                type="text"
                                onChange={(e) =>
                                  this.setState({ fullName: e.target.value })
                                }
                              />
                            </>
                          );
                        }}
                      </FormattedMessage>
                      {this.state.errors.fullName && (
                        <div className="text-danger">
                          {this.state.errors.fullName}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <FormattedMessage id="patient.booking_modal.phone_number">
                        {(placeholder) => {
                          return (
                            <>
                              <Label>{placeholder}</Label>
                              <Input
                                name="phoneNumber"
                                placeholder={placeholder}
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) =>
                                  this.setState({ phoneNumber: e.target.value })
                                }
                              />
                            </>
                          );
                        }}
                      </FormattedMessage>
                      {this.state.errors.phoneNumber && (
                        <div className="text-danger">
                          {this.state.errors.phoneNumber}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col md={6}>
                    <FormGroup>
                      <FormattedMessage id="patient.booking_modal.email">
                        {(placeholder) => {
                          return (
                            <>
                              <Label>{placeholder}</Label>
                              <Input
                                name="email"
                                placeholder={placeholder}
                                type="email"
                                value={email}
                                onChange={(e) =>
                                  this.setState({ email: e.target.value })
                                }
                              />
                            </>
                          );
                        }}
                      </FormattedMessage>
                      {this.state.errors.email && (
                        <div className="text-danger">
                          {this.state.errors.email}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup className="mb-2">
                      <FormattedMessage id="patient.booking_modal.address">
                        {(placeholder) => {
                          return (
                            <>
                              <Label> {placeholder}</Label>
                              <Input
                                name="address"
                                placeholder={placeholder}
                                type="text"
                                value={address}
                                onChange={(e) =>
                                  this.setState({ address: e.target.value })
                                }
                              />
                            </>
                          );
                        }}
                      </FormattedMessage>
                      {this.state.errors.address && (
                        <div className="text-danger">
                          {this.state.errors.address}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup className="mb-2">
                  <FormattedMessage id="patient.booking_modal.reason">
                    {(placeholder) => {
                      return (
                        <>
                          <Label> {placeholder}</Label>
                          <Input
                            name="reason"
                            placeholder={placeholder}
                            type="text"
                            value={reason}
                            onChange={(e) =>
                              this.setState({ reason: e.target.value })
                            }
                          />
                        </>
                      );
                    }}
                  </FormattedMessage>
                  {this.state.errors.reason && (
                    <div className="text-danger">
                      {this.state.errors.reason}
                    </div>
                  )}
                </FormGroup>
                <Row className="mb-2">
                  <Col md={6}>
                    <FormGroup>
                      <FormattedMessage id="patient.booking_modal.birth_day">
                        {(placeholder) => {
                          return (
                            <>
                              <Label> {placeholder}</Label>
                              <DatePicker
                                className="form-control"
                                onChange={this.handleChangeDatePicker}
                                placeholder={placeholder}
                                value={birthDay}
                              />
                            </>
                          );
                        }}
                      </FormattedMessage>
                      {this.state.errors.birthDay && (
                        <div className="text-danger">
                          {this.state.errors.birthDay}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <FormattedMessage id="patient.booking_modal.sex">
                        {(placeholder) => {
                          return (
                            <>
                              <Label> {placeholder}</Label>
                              <Select
                                value={selectedGender}
                                onChange={(selectedGender) =>
                                  this.setState({ selectedGender })
                                }
                                options={genders}
                                isClearable={true}
                                placeholder={placeholder}
                              />
                            </>
                          );
                        }}
                      </FormattedMessage>
                      {this.state.errors.selectedGender && (
                        <div className="text-danger">
                          {this.state.errors.selectedGender}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {isLoading ? (
            <Button color="primary px-2" disabled>
              <Spinner size="sm" />
              <span> Loading...</span>
            </Button>
          ) : (
            <Button
              className="px-2"
              color="primary"
              onClick={this.checkValidateInput}
            >
              <FormattedMessage id="patient.booking_modal.comfirm" />
            </Button>
          )}
          <Button className="px-2" color="danger" onClick={() => this.toggle()}>
            <FormattedMessage id="patient.booking_modal.cancel" />
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
    bookAppointment: state.admin.bookAppointment,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getExtraInfoDoctorByIdStart: (id) =>
      dispatch(getExtraInfoDoctorByIdStart(id)),
    fetchGenderStart: () => dispatch(fetchGenderStart()),
    bookAppointmentStart: (data) => dispatch(bookAppointmentStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
