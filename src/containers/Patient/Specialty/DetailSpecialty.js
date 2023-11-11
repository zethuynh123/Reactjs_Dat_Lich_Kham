import React, { Component } from "react";
import { connect } from "react-redux";
import { getExtraInfoDoctorByIdStart } from "../../../store/actions/adminActions";
import {
  getDetailSpecialtyByIdService,
  getAllCodeService,
} from "../../../services/userService";
import NumberFormat from "react-number-format";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import "./DetailSpecialty.scss";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [4, 49, 50],
      detailSpecialty: {},
      listProvince: [],
    };
  }

  handleChangeProvince = async (e) => {
    const { match } = this.props;
    console.log(e.target.value, match?.params?.id);
    let result = await getDetailSpecialtyByIdService(
      match?.params?.id,
      e.target.value
    );

    if (result.status === 200) {
      let arrDoctorId = [];
      if (result?.data?.doctorInfoData?.length > 0) {
        result.data.doctorInfoData.map((item) => {
          return arrDoctorId.push(item.doctorId);
        });
      }
      this.setState({
        // detailSpecialty: result.data,
        arrDoctorId,
      });
    }
  };

  async componentDidMount() {
    const { match } = this.props;

    if (match?.params?.id) {
      let id = match.params.id;
      console.log("selectedProvince", this.state.selectedProvince);
      let result = await getDetailSpecialtyByIdService(id, "ALL");

      if (result.status === 200) {
        let arrDoctorId = [];
        if (result?.data?.doctorInfoData?.length > 0) {
          result.data.doctorInfoData.map((item) => {
            return arrDoctorId.push(item.doctorId);
          });
        }
        this.setState({
          detailSpecialty: result.data,
          arrDoctorId,
        });
      }
    }

    let result = await getAllCodeService("PROVINCE");
    if (result.status === 200) {
      this.setState({ listProvince: result.data });
    }
  }

  render() {
    const { arrDoctorId, detailSpecialty, listProvince } = this.state;
    const { language } = this.props;
    console.log(listProvince);
    return (
      <div className="detail-specialty-container">
        <HomeHeader />
        <div className="detail-specialty-body">
          <div className="description-info-doctor">
            {!_.isEmpty(detailSpecialty) && (
              <div
                // className="wrapper-info-doctor"
                dangerouslySetInnerHTML={{
                  __html: detailSpecialty.descriptionHTML,
                }}
              ></div>
            )}
          </div>
          <div className="select-filter-doctor">
            <select onChange={this.handleChangeProvince}>
              <option value="ALL">
                {language === LANGUAGES.VI ? "Tất cả" : "All"}
              </option>
              {listProvince?.length > 0 &&
                listProvince.map((item, index) => {
                  return (
                    <option value={item.keyMap} key={index}>
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </option>
                  );
                })}
            </select>
            <i className="fas fa-chevron-down text"></i>
          </div>
          {arrDoctorId?.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <div key={index} className="doctor-specialty">
                  <div className="dt-content-left">
                    <ProfileDoctor
                      // detailInfoDoctors={detailInfoDoctors && detailInfoDoctors}
                      // dataTime={dataModal && dataModal}
                      isShowDescription={true}
                      isShowDetailDoctor={true}
                      isShowPrice={false}
                      doctorId={item}
                    />
                  </div>
                  <div className="dt-content-right">
                    <div className="doctor-schedule">
                      <DoctorSchedule
                        doctorId={item}
                        //  detailInfoDoctors={DetailInfoDoctors}
                      />
                    </div>
                    <div className="doctor-extra-info  border-top pt-2 mt-2">
                      <DoctorExtraInfo doctorId={item} />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
