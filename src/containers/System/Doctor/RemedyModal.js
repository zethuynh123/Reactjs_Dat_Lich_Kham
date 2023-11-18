import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchGenderStart,
  getExtraInfoDoctorByIdStart,
  bookAppointmentStart,
  getDetailDoctorStart,
} from "../../../store/actions/adminActions";
import NumberFormat from "react-number-format";
import { FormattedMessage } from "react-intl";
import DatePicker from "../../../components/Input/DatePicker";
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
import "./RemedyModal.scss";
import { CommonUtils, LANGUAGES } from "../../../utils";
import _ from "lodash";
import moment from "moment";

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      imageBase64: "",
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
    imageBase64: "",
    email: "",
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
    // if (!this.state.imageBase64 || this.state.imageBase64 === "") {
    //   errorObj.imageBase64 = "Missing an image";
    //   error = true;
    // }

    this.setState({ errors: errorObj });
    if (error) {
      return null;
    } else {
      this.setState({ isLoading: true });
      this.handleSendRemedy();
      this.setState({ errors: {} });
    }
  };

  handleSendRemedy = async () => {
    const { email, imageBase64 } = this.state;
    await this.props.handleSendRemedy({ email, imageBase64 });
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

  handleChangeImage = async (e) => {
    let data = e.target.files;
    let file = data[0];

    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({ imageBase64: base64 });
    }
  };

  async componentDidUpdate(prevProps) {
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
        // await this.props.getDetailDoctorStart(dataModal.doctorId);
        this.setState({
          email: dataModal.email,
          //   timeType: dataModal.timeType,
        });
      }
    }
  }

  render() {
    const {
      fullName,
      phoneNumber,
      email,
      imageBase64,
      address,
      reason,
      birthDay,
      genders,
      selectedGender,

      isLoading,
    } = this.state;
    const { DetailInfoDoctors, dataModal, doctorId } = this.props;
    return (
      <Modal
        isOpen={this.props.modal}
        toggle={() => this.toggle()}
        // style={{ width: "700px" }}
        centered
        // size="lg"
        // width={800}
        // width="1000px"
        className="modal-remedy"
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
            <div className="row">
              <Form>
                <Row className="mb-2">
                  <Col md={6}>
                    <FormGroup>
                      <FormattedMessage id="patient.booking_modal.email">
                        {(placeholder) => {
                          return (
                            <>
                              <Label> {placeholder}</Label>
                              <Input
                                name="email"
                                placeholder={placeholder}
                                value={email}
                                type="email"
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
                    <FormGroup>
                      <FormattedMessage id="patient.booking_modal.phone_number">
                        {(placeholder) => {
                          return (
                            <>
                              <Label>{placeholder}</Label>
                              <input
                                name="imageBase64"
                                // placeholder={placeholder}
                                className="form-control-file"
                                type="file"
                                onChange={this.handleChangeImage}
                              />
                            </>
                          );
                        }}
                      </FormattedMessage>
                      {this.state.errors.imageBase64 && (
                        <div className="text-danger">
                          {this.state.errors.imageBase64}
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
    DetailInfoDoctors: state.admin.DetailInfoDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getExtraInfoDoctorByIdStart: (id) =>
      dispatch(getExtraInfoDoctorByIdStart(id)),
    fetchGenderStart: () => dispatch(fetchGenderStart()),
    bookAppointmentStart: (data) => dispatch(bookAppointmentStart(data)),
    getDetailDoctorStart: (id) => dispatch(getDetailDoctorStart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
