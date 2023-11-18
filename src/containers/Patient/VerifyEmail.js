import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { verifyEmailBooking } from "../../services/userService";
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
import HomeHeader from "../HomePage/HomeHeader";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVerifyEmail: false,
      isLoading: null,
    };
  }

  async componentDidMount() {
    const { location } = this.props;

    if (location?.search) {
      const urlParams = new URLSearchParams(location.search);
      const token = urlParams.get("token");
      const doctorId = urlParams.get("doctorId");
      try {
        this.setState({ isLoading: true });
        let result = await verifyEmailBooking({ token, doctorId });
        if (result.status === 200) {
          this.setState({ isVerifyEmail: true, isLoading: false });
        }
      } catch (error) {
        console.log(error.response.data.message);
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    const { isVerifyEmail, isLoading } = this.state;
    return (
      <>
        <HomeHeader />
        <div className="mt-5">
          {isLoading ? (
            <div className="text-center">
              <Spinner color="info" />
              <span className="text-info fs-3"> Loading...</span>
            </div>
          ) : isVerifyEmail ? (
            <div className="text-secondary fs-3 fw-bold text-center text-uppercase">
              Xác nhận lịch hẹn thành công!
            </div>
          ) : (
            <div className="text-danger fs-3 fw-bold text-center text-uppercase">
              Lịch hẹn không tồn tại hoặc đã được xác nhận!
            </div>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
