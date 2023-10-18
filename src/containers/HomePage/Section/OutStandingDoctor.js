import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { fetchTopDoctorStart } from "../../../store/actions/adminActions";
import { LANGUAGES } from "../../../utils/constant";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topDoctors: [],
    };
  }

  componentDidMount() {
    this.props.fetchTopDoctorStart();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.topDoctors !== this.props.topDoctors) {
      this.setState({ topDoctors: this.props.topDoctors });
    }
  }

  handleViewDetailDoctor = (doctor) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  };

  render() {
    const { topDoctors } = this.state;
    const { language } = this.props;
    return (
      <div className="section-share section-outstanding-doctor">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.out-standing-doctor" />
            </span>
            <button className="btn-section">
              {" "}
              <FormattedMessage id="homepage.search" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {topDoctors &&
                topDoctors.length > 0 &&
                topDoctors.map((doctor, index) => {
                  let imageBase64 = "";
                  if (doctor.image) {
                    imageBase64 = new Buffer(doctor.image, "base64").toString(
                      "binary"
                    );
                  }
                  if (index === 0) {
                    console.log(doctor);
                  }
                  let nameVi = `${doctor.positionData.valueVi}, ${doctor.lastName} ${doctor.firstName}`;
                  let nameEn = `${doctor.positionData.valueEn}, ${doctor.firstName} ${doctor.lastName}`;
                  return (
                    <div
                      className="section-custom"
                      key={index}
                      onClick={() => this.handleViewDetailDoctor(doctor)}
                    >
                      <div className="custom-border">
                        <div className="outer-bg">
                          <div
                            className="bg-image section-outstanding-doctor"
                            style={{
                              backgroundImage: `url(${imageBase64})`,
                            }}
                          />
                        </div>
                        <div className="position text-center">
                          <div>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                          </div>
                          <div>Cơ xương khớp</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    topDoctors: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTopDoctorStart: (limit) => dispatch(fetchTopDoctorStart(limit)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
