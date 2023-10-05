import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";

class HomeHeader extends Component {
  render() {
    return (
      <div className="home-header-container">
        <div className="home-header-content px-3">
          <div className="left-content d-flex align-items-center">
            <i className="fas fa-bars fs-3 text-secondary"></i>
            <div className="header-logo"></div>
          </div>
          <div className="center-content d-flex justify-content-between align-items-center">
            <div className="child-content">
              <div className="fw-bold">Chuyên khoa</div>
              <div className="subs-title">TÌm bác sĩ theo chuyên khoa</div>
            </div>
            <div className="child-content">
              <div className="fw-bold">Cơ sở y tế</div>
              <div className="subs-title">Chọn bệnh viện phòng khám</div>
            </div>
            <div className="child-content">
              <div className="fw-bold">Bác sĩ</div>
              <div className="subs-title">Chọn bác sĩ giỏi</div>
            </div>
            <div className="child-content">
              <div className="fw-bold">Gói khám</div>
              <div className="subs-title">Khám sức khỏe tổng quát</div>
            </div>
          </div>
          <div className="right-content d-flex justify-content-center align-items-center">
            <div className="support">
              <i className="fas fa-question-circle"></i> Hỗ trợ
            </div>
            <div className="flag">VN</div>
          </div>
        </div>
        <div className="home-header-banner d-flex flex-column">
          <div className="content-up">
            <div className="title-first">Nền tảng y tế</div>
            <div className="title-second">Chăm sóc sức khỏe toàn diện</div>
            <div className="search">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Tìm bệnh viện" />
            </div>
          </div>
          <div className="content-down">
            <div className="options d-flex justify-content-center align-content-end">
              <div className="option-child d-flex justify-content-center align-items-center flex-column mx-5 d">
                <div className="icon-child d-flex justify-content-center align-items-center p-2 bg-white rounded-circle">
                  <i className="far fa-hospital"></i>
                </div>
                <div className="text-child">Khám chuyên khoa</div>
              </div>
              <div className="option-child d-flex justify-content-center align-items-center flex-column mx-5">
                <div className="icon-child d-flex justify-content-center align-items-center p-2 bg-white rounded-circle">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <div className="text-child">
                  Khám <br />
                  từ xa
                </div>
              </div>
              <div className="option-child d-flex justify-content-center align-items-center flex-column mx-5">
                <div className="icon-child d-flex justify-content-center align-items-center p-2 bg-white rounded-circle">
                  <i class="fas fa-notes-medical"></i>
                </div>
                <div className="text-child">
                  Khám <br />
                  tổng quát
                </div>
              </div>
              <div className="option-child d-flex justify-content-center align-items-center flex-column mx-5">
                <div className="icon-child d-flex justify-content-center align-items-center p-2 bg-white rounded-circle">
                  <i class="fas fa-vial"></i>
                </div>
                <div className="text-child">
                  Xét nghiệm
                  <br /> y học
                </div>
              </div>
              <div className="option-child d-flex justify-content-center align-items-center flex-column mx-5">
                <div className="icon-child d-flex justify-content-center align-items-center p-2 bg-white rounded-circle">
                  <i class="fas fa-heartbeat"></i>
                </div>
                <div className="text-child">
                  Sức khỏe
                  <br /> tinh thần
                </div>
              </div>
              <div className="option-child d-flex justify-content-center align-items-center flex-column mx-5">
                <div className="icon-child d-flex justify-content-center align-items-center p-2 bg-white rounded-circle">
                  <i class="far fa-smile"></i>
                </div>
                <div className="text-child">
                  Khám
                  <br /> nha khoa
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
