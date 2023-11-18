import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getDetailDoctorStart,
  getExtraInfoDoctorByIdStart,
} from "../../../store/actions/adminActions";
import {
  getDetailClinicByIdService,
  getAllCodeService,
} from "../../../services/userService";
import NumberFormat from "react-number-format";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import "./DetailClinic.scss";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      detailClinic: {},
    };
  }

  async componentDidMount() {
    const { match } = this.props;

    if (match?.params?.id) {
      let id = match.params.id;
      let result = await getDetailClinicByIdService(id);

      if (result.status === 200) {
        let arrDoctorId = [];
        if (result?.data?.doctorOnClinicData?.length > 0) {
          result.data.doctorOnClinicData.map((item) => {
            return arrDoctorId.push(item.doctorId);
          });
        }
        this.setState({
          detailClinic: result.data,
          arrDoctorId,
        });
      }
    }

    // let result = await getAllCodeService("PROVINCE");
    // if (result.status === 200) {
    //   this.setState({ listProvince: result.data });
    // }
  }

  render() {
    const { arrDoctorId, detailClinic } = this.state;
    return (
      <div className="detail-specialty-container">
        <HomeHeader />
        <div className="detail-specialty-body">
          <div className="description-info-doctor mb-5">
            {!_.isEmpty(detailClinic) && (
              <>
                <div className="fs-4 fw-bold">{detailClinic.name}</div>
                <div
                  // className="wrapper-info-doctor"
                  dangerouslySetInnerHTML={{
                    __html: detailClinic.descriptionHTML,
                  }}
                ></div>
              </>
            )}
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
    DetailInfoDoctors: state.admin.DetailInfoDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getExtraInfoDoctorByIdStart: (id) =>
      dispatch(getExtraInfoDoctorByIdStart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
