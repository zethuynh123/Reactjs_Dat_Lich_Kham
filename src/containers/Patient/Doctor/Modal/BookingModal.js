import React, { Component } from "react";
import { connect } from "react-redux";
import { getExtraInfoDoctorByIdStart } from "../../../../store/actions/adminActions";
import NumberFormat from "react-number-format";
import { FormattedMessage } from "react-intl";
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

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toggle = () => {
    this.props.toggle();
  };

  async componentDidMount() {
    const { doctorId, getExtraInfoDoctorByIdStart } = this.props;
  }

  componentDidUpdate(prevProps) {
    const { language, InfoDoctorById } = this.props;

    if (prevProps.language !== language) {
    }
  }

  render() {
    const { isShowDetail, extraInfoDoctor } = this.state;
    const { language, detailInfoDoctors, dataModal } = this.props;
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
          <span className="fs-3 fw-bold">Add new user</span>
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="doctor-info">
              <ProfileDoctor
                detailInfoDoctors={detailInfoDoctors && detailInfoDoctors}
                dataTime={dataModal && dataModal}
                isShowDescription={false}
              />
            </div>
            <div className="row">
              <Form>
                <Row className="mb-2">
                  <Col md={6}>
                    <FormGroup>
                      <Label>Họ tên</Label>
                      <Input
                        name="firstName"
                        placeholder="First name"
                        type="text"
                        // onChange={(e) =>
                        //   this.setState({ firstName: e.target.value })
                        // }
                      />
                      {/* {this.state.errors.firstName && (
                        <div className="text-danger">
                          {this.state.errors.firstName}
                        </div>
                      )} */}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label>Số điện thoại</Label>
                      <Input
                        name="phoneNumber"
                        placeholder="Phone number"
                        type="tel"
                        // onChange={(e) =>
                        //   this.setState({ phoneNumber: e.target.value })
                        // }
                      />
                      {/* {this.state.errors.phoneNumber && (
                        <div className="text-danger">
                          {this.state.errors.phoneNumber}
                        </div>
                      )} */}
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col md={6}>
                    <FormGroup>
                      <Label>Địa chỉ Email</Label>
                      <Input
                        name="email"
                        placeholder="Email"
                        type="email"
                        // onChange={(e) =>
                        //   this.setState({ email: e.target.value })
                        // }
                      />
                      {/* {this.state.errors.email && (
                        <div className="text-danger">
                          {this.state.errors.email}
                        </div>
                      )} */}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup className="mb-2">
                      <Label>Địa chỉ liên hệ</Label>
                      <Input
                        name="address"
                        placeholder="Address"
                        type="text"
                        // onChange={(e) => this.setState({ address: e.target.value })}
                      />
                      {/* {this.state.errors.address && (
                    <div className="text-danger">
                      {this.state.errors.address}
                    </div>
                  )} */}
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup className="mb-2">
                  <Label>Lí do khám</Label>
                  <Input
                    name="address"
                    placeholder="Address"
                    type="text"
                    // onChange={(e) => this.setState({ address: e.target.value })}
                  />
                  {/* {this.state.errors.address && (
                    <div className="text-danger">
                      {this.state.errors.address}
                    </div>
                  )} */}
                </FormGroup>
                <Row className="mb-2">
                  <Col md={6}>
                    <FormGroup>
                      <Label>Phone number</Label>
                      <Input
                        name="phoneNumber"
                        placeholder="Phone number"
                        type="tel"
                        // onChange={(e) =>
                        //   this.setState({ phoneNumber: e.target.value })
                        // }
                      />
                      {/* {this.state.errors.phoneNumber && (
                        <div className="text-danger">
                          {this.state.errors.phoneNumber}
                        </div>
                      )} */}
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label>Sex</Label>
                      <Input
                        name="gender"
                        type="select"
                        placeholder="Sex"
                        defaultValue={"1"}
                        // onChange={(e) =>
                        //   this.setState({ gender: e.target.value })
                        // }
                      >
                        <option value="1">Male</option>
                        <option value="0">Female</option>
                      </Input>
                      {/* {this.state.errors.gender && (
                        <div className="text-danger">
                          {this.state.errors.gender}
                        </div>
                      )} */}
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="exampleZip">Role</Label>
                      <Input
                        name="roleId"
                        type="select"
                        placeholder="Role"
                        defaultValue={"1"}
                        // onChange={(e) =>
                        //   this.setState({ roleId: e.target.value })
                        // }
                      >
                        <option value="1">Admin</option>
                        <option value="2">Doctor</option>
                        <option value="3">Patient</option>
                      </Input>
                      {/* {this.state.errors.roleId && (
                        <div className="text-danger">
                          {this.state.errors.roleId}
                        </div>
                      )} */}
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {this.state.isLoading ? (
            <Button color="primary px-2" disabled>
              <Spinner size="sm">Loading...</Spinner>
              <span> Loading</span>
            </Button>
          ) : (
            <Button
              className="px-2"
              color="primary"
              onClick={this.checkValidateInput}
            >
              Create user
            </Button>
          )}
          <Button className="px-2" color="danger" onClick={() => this.toggle()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
