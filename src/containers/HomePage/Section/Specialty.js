import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import Slider from "react-slick";
import { getAllSpecialtyStart } from "../../../store/actions/adminActions";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specialties: [],
    };
  }

  handleViewDetailDoctor = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`);
    }
  };

  async componentDidMount() {
    await this.props.getAllSpecialtyStart();
  }

  componentDidUpdate(prevProps) {
    const { allSpecialty } = this.props;
    if (prevProps.allSpecialty !== allSpecialty) {
      this.setState({ specialties: allSpecialty });
    }
  }

  render() {
    const { specialties } = this.state;
    console.log(specialties);
    return (
      <div className="section-share section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.popular_specialties" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="homepage.see_more" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {specialties?.length > 0 &&
                specialties.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="section-custom"
                      onClick={() => this.handleViewDetailDoctor(item)}
                    >
                      <div
                        className="bg-image section-specialty"
                        style={{
                          backgroundImage: `url(${item.image})`,
                          borderRadius: "4px",
                        }}
                      />
                      <div>{item.name}</div>
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
    allSpecialty: state.admin.allSpecialty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllSpecialtyStart: () => dispatch(getAllSpecialtyStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
