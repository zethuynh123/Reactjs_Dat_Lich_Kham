import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";
import { LANGUAGES, CommonUtils } from "../../../utils";
import NumberFormat from "react-number-format";
import { FormattedMessage } from "react-intl";
import { getExtraInfoDoctorByIdService } from "../../../services/userService";

class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetail: false,
      extraInfoDoctor: [],
    };
  }

  async componentDidMount() {
    const { doctorId } = this.props;
    if (doctorId) {
      let result = await getExtraInfoDoctorByIdService(doctorId);
      if (result.status === 200) {
        this.setState({ extraInfoDoctor: result.data });
      }
    }
  }

  async componentDidUpdate(prevProps) {
    const { doctorId } = this.props;
    if (prevProps.doctorId !== doctorId) {
      let result = await getExtraInfoDoctorByIdService(doctorId);
      if (result.status === 200) {
        this.setState({ extraInfoDoctor: result.data });
      }
    }
  }

  render() {
    const { isShowDetail, extraInfoDoctor } = this.state;
    const { language } = this.props;
    return (
      <div className="extra-info-container">
        <div className="content-up">
          <div className="address-title text-uppercase fw-bold">
            <FormattedMessage id="patient.extra_info_doctor.text_address" />
          </div>
          <div className="fw-bold py-1">
            {extraInfoDoctor?.nameClinic ?? ""}
          </div>
          <div className="pb-2">{extraInfoDoctor?.addressClinic ?? ""}</div>
        </div>
        <div className="content-down">
          {isShowDetail ? (
            <>
              <div className="price-exam text-uppercase fw-bold pt-2 pb-3">
                <FormattedMessage id="patient.extra_info_doctor.price_examination" />
                :
              </div>
              <div className=" border border-2 mb-2">
                <div className="price-wrapper px-1 py-2">
                  <div
                    className=" d-flex justify-content-between flex-column fs-5"
                    style={{ lineHeight: "15px" }}
                  >
                    <div className="d-flex justify-content-between">
                      <span>
                        <FormattedMessage id="patient.extra_info_doctor.price_examination" />
                      </span>
                      <span>
                        {language === LANGUAGES.VI ? (
                          <NumberFormat
                            value={extraInfoDoctor?.priceTypeData?.valueVi}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={"vnđ"}
                          />
                        ) : (
                          <NumberFormat
                            value={extraInfoDoctor?.priceTypeData?.valueEn}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={"$"}
                          />
                        )}
                      </span>
                    </div>
                    <div className="text-note">({extraInfoDoctor.note})</div>
                  </div>
                  <div className="text-price">
                    Giá tư vấn 15 phút: 250.000vnđ
                  </div>
                  <div className="text-price">
                    Giá tư vấn 30 phút: 500.000vnđ
                  </div>
                </div>
                <div className="method-payment px-1 py-2 fs-5">
                  <FormattedMessage id="patient.extra_info_doctor.method_payment" />
                  :{" "}
                  {language === LANGUAGES.VI
                    ? extraInfoDoctor?.paymentTypeData?.valueVi
                    : extraInfoDoctor?.paymentTypeData?.valueEn}
                </div>
              </div>
              <span
                className="hide-price show-detail"
                onClick={() => this.setState({ isShowDetail: false })}
              >
                <FormattedMessage id="patient.extra_info_doctor.hide_price_list" />
              </span>
            </>
          ) : (
            <div className="pt-2 pb-3">
              <span className="price-exam text-uppercase fw-bold">
                <FormattedMessage id="patient.extra_info_doctor.price_examination" />
                :
              </span>{" "}
              {language === LANGUAGES.VI ? (
                <NumberFormat
                  value={extraInfoDoctor?.priceTypeData?.valueVi}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"vnđ. "}
                />
              ) : (
                <NumberFormat
                  value={extraInfoDoctor?.priceTypeData?.valueEn}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"$. "}
                />
              )}
              <span
                className="show-detail"
                onClick={() => this.setState({ isShowDetail: true })}
              >
                <FormattedMessage id="patient.extra_info_doctor.show_detail" />
              </span>
            </div>
          )}
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
