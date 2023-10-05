import React, { Component } from "react";
import { connect } from "react-redux";
import { editUser } from "../../services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import "./ModalEditUser.scss";

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toastId: null,
      isLoading: false,
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "1",
      roleId: "0",
      errors: {},
    };
  }

  errObject = {
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
    address: "",
    phoneNumber: "",
    roleId: "",
  };

  toggle = () => {
    this.props.toggle();
    this.reset();
  };

  checkValidateInput = () => {
    let error = false;
    let errorObj = { ...this.errObject };

    if (!this.state.firstName || this.state.firstName === "") {
      errorObj.firstName = "Missing the first name";
      error = true;
    }

    if (!this.state.lastName || this.state.lastName === "") {
      errorObj.lastName = "Missing the last name";
      error = true;
    }
    if (!this.state.address || this.state.address === "") {
      errorObj.address = "Missing the address";
      error = true;
    }
    if (!this.state.gender || this.state.gender === "") {
      errorObj.gender = "Missing the gender";
      error = true;
    }
    if (!this.state.phoneNumber || this.state.phoneNumber === "") {
      errorObj.phoneNumber = "Missing the phone number";
      error = true;
    }
    if (!this.state.roleId || this.state.roleId === "") {
      errorObj.roleId = "Missing the role";
      error = true;
    }

    this.setState({ errors: errorObj });
    if (error) {
      return null;
    } else {
      this.handleEditUser();
      this.setState({ errors: {} });
    }
  };

  reset = () => {
    this.setState({
      toastId: null,
      isLoading: false,
      modal: false,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "1",
      roleId: "0",
      errors: {},
    });
  };

  handleEditUser = async () => {
    this.setState({ isLoading: true });
    let data = {
      id: this.state.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      gender: this.state.gender,
      roleId: this.state.roleId,
    };
    try {
      let result = await editUser(data);
      if (result.status === 200) {
        this.setState({ isLoading: false });
        toast.success(result.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          closeOnClick: true,
          closeButton: false,
        });
        this.toggle();
        this.props.getAllUser();
      }
    } catch (error) {
      this.setState({ isLoading: false });
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        closeOnClick: true,
        closeButton: false,
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({
        id: nextProps.data.id,
        email: nextProps.data.email,
        password: nextProps.data.password,
        firstName: nextProps.data.firstName,
        lastName: nextProps.data.lastName,
        gender: nextProps.data.gender.toString(),
        address: nextProps.data.address,
        phoneNumber: nextProps.data.phoneNumber,
        roleId: nextProps.data.roleId,
      });
    }
  }

  componentDidMount() {}

  render() {
    return (
      <Modal
        isOpen={this.props.modal}
        toggle={() => this.toggle()}
        centered
        size="lg"
        className="modal-create-user"
      >
        <ModalHeader
          className="text-secondary py-4 px-3"
          toggle={() => this.toggle()}
        >
          <span className="fs-3 fw-bold">Edit user</span>
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <Form>
                <Row className="mb-2">
                  <Col md={6}>
                    <FormGroup>
                      <Label>Email</Label>
                      <Input
                        name="email"
                        placeholder="Email"
                        type="email"
                        value={this.state.email}
                        onChange={(e) =>
                          this.setState({ email: e.target.value })
                        }
                        readOnly
                      />
                      {this.state.errors.email && (
                        <div className="text-danger">
                          {this.state.errors.email}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label>Password</Label>
                      <Input
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={""}
                        onChange={(e) =>
                          this.setState({ password: e.target.value })
                        }
                        readOnly
                      />
                      {this.state.errors.password && (
                        <div className="text-danger">
                          {this.state.errors.password}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col md={6}>
                    <FormGroup>
                      <Label>First name</Label>
                      <Input
                        name="firstName"
                        placeholder="First name"
                        type="text"
                        value={this.state.firstName}
                        onChange={(e) =>
                          this.setState({ firstName: e.target.value })
                        }
                      />
                      {this.state.errors.firstName && (
                        <div className="text-danger">
                          {this.state.errors.firstName}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label>Last name</Label>
                      <Input
                        name="lastName"
                        placeholder="Last name"
                        type="text"
                        value={this.state.lastName}
                        onChange={(e) =>
                          this.setState({ lastName: e.target.value })
                        }
                      />
                      {this.state.errors.lastName && (
                        <div className="text-danger">
                          {this.state.errors.lastName}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup className="mb-2">
                  <Label>Address</Label>
                  <Input
                    name="address"
                    placeholder="Address"
                    type="text"
                    value={this.state.address}
                    onChange={(e) => this.setState({ address: e.target.value })}
                  />
                  {this.state.errors.address && (
                    <div className="text-danger">
                      {this.state.errors.address}
                    </div>
                  )}
                </FormGroup>
                <Row className="mb-2">
                  <Col md={6}>
                    <FormGroup>
                      <Label>Phone number</Label>
                      <Input
                        name="phoneNumber"
                        placeholder="Phone number"
                        type="tel"
                        value={this.state.phoneNumber}
                        onChange={(e) =>
                          this.setState({ phoneNumber: e.target.value })
                        }
                      />
                      {this.state.errors.phoneNumber && (
                        <div className="text-danger">
                          {this.state.errors.phoneNumber}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label>Sex</Label>
                      <Input
                        name="gender"
                        type="select"
                        placeholder="Sex"
                        value={this.state.gender.toString()}
                        onChange={(e) =>
                          this.setState({ gender: e.target.value })
                        }
                      >
                        <option value="1">Male</option>
                        <option value="0">Female</option>
                      </Input>
                      {this.state.errors.gender && (
                        <div className="text-danger">
                          {this.state.errors.gender}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="exampleZip">Role</Label>
                      <Input
                        name="roleId"
                        type="select"
                        placeholder="Role"
                        value={this.state.roleId.toString()}
                        onChange={(e) =>
                          this.setState({ roleId: e.target.value })
                        }
                      >
                        <option value="1">Admin</option>
                        <option value="2">Doctor</option>
                        <option value="3">Patient</option>
                      </Input>
                      {this.state.errors.roleId && (
                        <div className="text-danger">
                          {this.state.errors.roleId}
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
              Save
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
