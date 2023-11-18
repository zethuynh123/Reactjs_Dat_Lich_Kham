import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { getAllClinicService } from "../../../services/userService";
import { getAllClinicStart } from "../../../store/actions/adminActions";
import { withRouter } from "react-router";

class MedicalFacialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clinics: [],
    };
  }

  handleViewDetailClinic = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${item.id}`);
    }
  };

  async componentDidMount() {
    await this.props.getAllClinicStart();
  }

  componentDidUpdate(prevProps) {
    const { allClinic } = this.props;
    if (prevProps.allClinic !== allClinic) {
      this.setState({ clinics: allClinic });
    }
  }
  render() {
    const { clinics } = this.state;
    return (
      <div className="section-share section-medical-facility">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cơ sở y tế nổi bật</span>
            <button className="btn-section">Tìm kiếm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {clinics?.length > 0 &&
                clinics.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="section-custom"
                      onClick={() => this.handleViewDetailClinic(item)}
                    >
                      <div
                        className="bg-image section-medical-facility"
                        style={{
                          backgroundImage: `url(${item.image})`,
                          borderRadius: "4px",
                        }}
                      />
                      <div className="pe-2">{item.name}</div>
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
    isLoggedIn: state.user.isLoggedIn,
    allClinic: state.admin.allClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllClinicStart: () => dispatch(getAllClinicStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacialty)
);
