import React, { Component } from "react";
import { connect } from "react-redux";
import { getExtraInfoDoctorByIdStart } from "../../store/actions/adminActions";
import NumberFormat from "react-number-format";
import { FormattedMessage } from "react-intl";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
    const { language } = this.props;
    return <div></div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
