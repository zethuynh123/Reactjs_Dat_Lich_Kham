import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import { getDetailDoctorStart } from "../../../store/actions/adminActions";
import { LANGUAGES } from "../../../utils";
import _ from "lodash";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";
import "./DetailDoctor.scss";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DetailInfoDoctors: {},
    };
  }
  async componentDidMount() {
    if (this.props?.match?.params?.id) {
      let id = this.props.match.params.id;
      await this.props.getDetailDoctorStart(id);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.DetailInfoDoctors !== this.props.DetailInfoDoctors) {
      this.setState({ DetailInfoDoctors: this.props.DetailInfoDoctors });
    }
  }

  render() {
    const { DetailInfoDoctors } = this.state;
    const { language } = this.props;
    let nameVi = "",
      nameEn = "";

    if (DetailInfoDoctors && DetailInfoDoctors.positionData) {
      nameVi = `${DetailInfoDoctors.positionData.valueVi}, ${DetailInfoDoctors.lastName} ${DetailInfoDoctors.firstName}`;
      nameEn = `${DetailInfoDoctors.positionData.valueEn}, ${DetailInfoDoctors.firstName} ${DetailInfoDoctors.lastName}`;
    }
    return (
      <>
        <HomeHeader />
        {!_.isEmpty(DetailInfoDoctors) && (
          <div className="doctor-detail-container">
            <div className="introduce-doctor">
              <div
                className="content-left"
                style={{
                  backgroundImage: `url(${
                    DetailInfoDoctors.image && DetailInfoDoctors.image
                  })`,
                }}
              ></div>
              <div className="content-right">
                <div className="name-doctor">
                  {language === LANGUAGES.VI ? nameVi : nameEn}
                </div>
                <div className="info-doctor">
                  {DetailInfoDoctors.Markdown &&
                    DetailInfoDoctors.Markdown.description && (
                      <span>{DetailInfoDoctors.Markdown.description}</span>
                    )}
                </div>
              </div>
            </div>
            <div className="schedule-doctor">
              <div className="content-left">
                <DoctorSchedule
                  doctorId={this.props?.match?.params?.id}
                  detailInfoDoctors={DetailInfoDoctors}
                />
              </div>
              <div className="content-right">
                <DoctorExtraInfo doctorId={this.props?.match?.params?.id} />
              </div>
            </div>
            <div className="detail-info-doctor">
              {DetailInfoDoctors.Markdown &&
                DetailInfoDoctors.Markdown.contentHTML && (
                  <div
                    className="wrapper-info-doctor"
                    dangerouslySetInnerHTML={{
                      __html: DetailInfoDoctors.Markdown.contentHTML,
                    }}
                  ></div>
                )}
            </div>
            <div className="comment-doctor"></div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DetailInfoDoctors: state.admin.DetailInfoDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailDoctorStart: (id) => dispatch(getDetailDoctorStart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
