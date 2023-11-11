import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllUser, deleteUser } from "../../../services/userService";
import { LANGUAGES, CRUD_ACTIONS } from "../../../utils";
import { toast } from "react-toastify";
import {
  getAllUserStart,
  deleteUserStart,
  fetchAllDoctorStart,
  saveDetailDoctorStart,
  getDetailDoctorStart,
  fetchAllCodeStart,
  getAllSpecialtyStart,
} from "../../../store/actions/adminActions";
import "react-toastify/dist/ReactToastify.css";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import "./ManageDoctor.scss";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //save markdown
      selectedDoctor: "",
      contentMarkdown: "",
      contentHTML: "",
      description: "",
      listDoctor: [],
      isSaveInfo: false,

      //save doctor info table
      listPrice: [],
      listMethodPayment: [],
      listProvince: [],
      listSpecialty: [],
      listClinic: [],
      selectedPrice: "",
      selectedMethod: "",
      selectedProvince: "",
      selectedClinic: "",
      selectedSpecialty: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }

  async componentDidMount() {
    this.props.fetchAllDoctorStart();
    this.props.fetchAllCodeStart("PRICE");
    this.props.fetchAllCodeStart("PROVINCE");
    this.props.fetchAllCodeStart("PAYMENT");
    this.props.getAllSpecialtyStart();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.allDoctors !== this.props.allDoctors ||
      prevProps.language !== this.props.language
    ) {
      let listDoctor = this.handleConvertArrToOptionsSelect(
        this.props.allDoctors
      );
      if (listDoctor && listDoctor.length > 0) {
        this.setState({ listDoctor });
      }
    }

    if (
      prevProps.price !== this.props.price ||
      prevProps.language !== this.props.language
    ) {
      let listPrice = this.handleConvertAllCodeToOptionsSelect(
        this.props.price
      );
      if (listPrice && listPrice.length > 0) {
        this.setState({ listPrice });
      }
    }

    if (
      prevProps.methodPayment !== this.props.methodPayment ||
      prevProps.language !== this.props.language
    ) {
      let listMethodPayment = this.handleConvertAllCodeToOptionsSelect(
        this.props.methodPayment
      );
      if (listMethodPayment && listMethodPayment.length > 0) {
        this.setState({ listMethodPayment });
      }
    }

    if (
      prevProps.province !== this.props.province ||
      prevProps.language !== this.props.language
    ) {
      let listProvince = this.handleConvertAllCodeToOptionsSelect(
        this.props.province
      );
      if (listProvince && listProvince.length > 0) {
        this.setState({ listProvince });
      }
    }
    if (prevProps.allSpecialty !== this.props.allSpecialty) {
      let listSpecialty = this.handleConvertSpecialtyToOptionsSelect(
        this.props.allSpecialty
      );
      if (listSpecialty && listSpecialty.length > 0) {
        this.setState({ listSpecialty });
      }
    }

    if (prevProps.saveInfoDoctor !== this.props.saveInfoDoctor) {
      if (this.props.saveInfoDoctor.status === 200) {
      }
    }

    if (
      prevProps.DetailInfoDoctors !== this.props.DetailInfoDoctors ||
      prevProps.language !== this.props.language
    ) {
      const { listProvince, listPrice, listMethodPayment, listSpecialty } =
        this.state;
      if (this.props.DetailInfoDoctors.Markdown) {
        if (this.props.DetailInfoDoctors.Doctor_Infor) {
          this.setState({
            selectedPrice: listPrice.find(
              (item) =>
                item.value === this.props.DetailInfoDoctors.Doctor_Infor.priceId
            ),
            selectedMethod: listMethodPayment.find(
              (item) =>
                item.value ===
                this.props.DetailInfoDoctors.Doctor_Infor.paymentId
            ),
            selectedProvince: listProvince.find(
              (item) =>
                item.value ===
                this.props.DetailInfoDoctors.Doctor_Infor.provinceId
            ),
            selectedSpecialty: listSpecialty.find(
              (item) =>
                item.value ===
                this.props.DetailInfoDoctors.Doctor_Infor.specialtyId
            ),
            nameClinic: this.props.DetailInfoDoctors.Doctor_Infor.nameClinic,
            addressClinic:
              this.props.DetailInfoDoctors.Doctor_Infor.addressClinic,
            note: this.props.DetailInfoDoctors.Doctor_Infor.note,
          });
        } else {
          this.setState({
            nameClinic: "",
            addressClinic: "",
            note: "",
            selectedPrice: "",
            selectedMethod: "",
            selectedProvince: "",
            selectedSpecialty: "",
          });
        }
        this.setState({
          description: this.props.DetailInfoDoctors.Markdown.description,
          contentHTML: this.props.DetailInfoDoctors.Markdown.contentHTML,
          contentMarkdown:
            this.props.DetailInfoDoctors.Markdown.contentMarkdown,
          isSaveInfo: true,
        });
      } else {
        this.setState({
          description: "",
          contentHTML: "",
          contentMarkdown: "",
          isSaveInfo: false,
        });
      }
    }
  }

  reset = () => {
    this.setState({
      selectedDoctor: "",
      contentMarkdown: "",
      contentHTML: "",
      description: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
      selectedPrice: "",
      selectedMethod: "",
      selectedSpecialty: "",
      selectedProvince: "",
    });
  };

  handleConvertArrToOptionsSelect = (data) => {
    let result = [];
    let { language } = this.props;
    if (data && data.length > 0) {
      data.map((doctor) => {
        let labelVi = `${doctor.lastName} ${doctor.firstName}`;
        let labelEn = `${doctor.firstName} ${doctor.lastName}`;
        return result.push({
          label: language === LANGUAGES.VI ? labelVi : labelEn,
          value: doctor.id,
        });
      });
    }
    return result;
  };

  handleConvertAllCodeToOptionsSelect = (data) => {
    let result = [];
    let { language } = this.props;
    if (data && data.length > 0) {
      data.map((item) => {
        return result.push({
          label: language === LANGUAGES.VI ? item.valueVi : item.valueEn,
          value: item.keyMap,
        });
      });
    }
    return result;
  };

  handleConvertSpecialtyToOptionsSelect = (data) => {
    let result = [];
    if (data?.length > 0) {
      data.map((item) => {
        return result.push({
          label: item.name,
          value: item.id,
        });
      });
    }
    return result;
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleDoctorChange = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
    await this.props.getDetailDoctorStart(selectedDoctor.value);
  };

  handleSaveInfo = async () => {
    await this.props.saveDetailDoctorStart({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
      action: this.state.isSaveInfo ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.ADD,
      selectedPrice: this.state.selectedPrice.value,
      selectedMethod: this.state.selectedMethod.value,
      selectedProvince: this.state.selectedProvince.value,
      specialtyId: this.state.selectedSpecialty.value,
      clinicId: this.state?.selectedClinic.value ?? "",
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
    });
    this.reset();
  };
  render() {
    const {
      listDoctor,
      listPrice,
      listMethodPayment,
      listProvince,
      listClinic,
      listSpecialty,
      isSaveInfo,
      selectedPrice,
      selectedMethod,
      selectedClinic,
      selectedSpecialty,
      selectedProvince,
      addressClinic,
      nameClinic,
      note,
    } = this.state;

    return (
      <div className="manage-doctor-container p-3">
        <div className="manage-doctor-title text-center text-uppercase fs-3 fw-bold my-3">
          <FormattedMessage id="admin.manage_doctor.title" />
        </div>
        <div className="manage-doctor-editor">
          <div className="info-doctor d-flex flex-column">
            <div className="d-flex gap-3 mb-3">
              <div className="content-left">
                <label className="fs-5 text-secondary">
                  <FormattedMessage id="admin.manage_doctor.select_doctor" />
                </label>
                <Select
                  value={this.state.selectedDoctor}
                  onChange={this.handleDoctorChange}
                  options={listDoctor}
                  isClearable={true}
                  placeholder={
                    <FormattedMessage id="admin.manage_doctor.select_doctor" />
                  }
                />
              </div>
              <div className="content-right">
                <label className="fs-5 text-secondary">
                  <FormattedMessage id="admin.manage_doctor.intro" />
                </label>
                <FormattedMessage id="admin.manage_doctor.choose_province">
                  {(placeholder) => (
                    <textarea
                      className="form-control"
                      value={this.state.description}
                      onChange={(e) =>
                        this.setState({ description: e.target.value })
                      }
                      placeholder={placeholder}
                    ></textarea>
                  )}
                </FormattedMessage>
              </div>
            </div>
            <div className="d-flex gap-3 mb-3">
              <div className="content-left">
                <label className="fs-5 text-secondary">
                  <FormattedMessage id="admin.manage_doctor.choose_price" />
                </label>
                <Select
                  value={selectedPrice}
                  onChange={(selectedPrice) => this.setState({ selectedPrice })}
                  options={listPrice}
                  isClearable={true}
                  placeholder={
                    <FormattedMessage id="admin.manage_doctor.choose_price" />
                  }
                />
              </div>
              <div className="content-left">
                <label className="fs-5 text-secondary">
                  <FormattedMessage id="admin.manage_doctor.choose_method" />
                </label>
                <Select
                  value={selectedMethod}
                  onChange={(selectedMethod) =>
                    this.setState({ selectedMethod })
                  }
                  options={listMethodPayment}
                  isClearable={true}
                  placeholder={
                    <FormattedMessage id="admin.manage_doctor.choose_method" />
                  }
                />
              </div>
              <div className="content-left">
                <label className="fs-5 text-secondary">
                  <FormattedMessage id="admin.manage_doctor.choose_province" />
                </label>
                <Select
                  value={selectedProvince}
                  onChange={(selectedProvince) =>
                    this.setState({ selectedProvince })
                  }
                  options={listProvince}
                  isClearable={true}
                  placeholder={
                    <FormattedMessage id="admin.manage_doctor.choose_province" />
                  }
                />
              </div>
            </div>
            <div className="d-flex gap-3 mb-3">
              <div className="content-left">
                <label className="fs-5 text-secondary">
                  <FormattedMessage id="admin.manage_doctor.name_clinic" />
                </label>
                <FormattedMessage id="admin.manage_doctor.name_clinic">
                  {(placeholder) => {
                    return (
                      <input
                        className="form-control py-2"
                        onChange={(e) =>
                          this.setState({ nameClinic: e.target.value })
                        }
                        value={nameClinic}
                        placeholder={placeholder}
                      />
                    );
                  }}
                </FormattedMessage>
              </div>
              <div className="content-left">
                <label className="fs-5 text-secondary">
                  <FormattedMessage id="admin.manage_doctor.address_clinic" />
                </label>
                <FormattedMessage id="admin.manage_doctor.address_clinic">
                  {(placeholder) => {
                    return (
                      <input
                        className="form-control py-2"
                        onChange={(e) =>
                          this.setState({ addressClinic: e.target.value })
                        }
                        value={addressClinic}
                        placeholder={placeholder}
                      />
                    );
                  }}
                </FormattedMessage>
              </div>
              <div className="content-left">
                <label className="fs-5 text-secondary">
                  <FormattedMessage id="admin.manage_doctor.note" />
                </label>
                <FormattedMessage id="admin.manage_doctor.note">
                  {(placeholder) => {
                    return (
                      <input
                        className="form-control py-2"
                        onChange={(e) =>
                          this.setState({ note: e.target.value })
                        }
                        value={note}
                        placeholder={placeholder}
                      />
                    );
                  }}
                </FormattedMessage>
              </div>
            </div>
            <div className="d-flex gap-3 mb-3">
              <div className="content-left">
                <label className="fs-5 text-secondary">
                  <FormattedMessage id="admin.manage_doctor.choose_specialty" />
                </label>
                <Select
                  value={selectedSpecialty}
                  onChange={(selectedSpecialty) =>
                    this.setState({ selectedSpecialty })
                  }
                  options={listSpecialty}
                  isClearable={true}
                  placeholder={
                    <FormattedMessage id="admin.manage_doctor.choose_specialty" />
                  }
                />
              </div>
              <div className="content-left">
                <label className="fs-5 text-secondary">
                  <FormattedMessage id="admin.manage_doctor.choose_clinic" />
                </label>
                <Select
                  value={selectedClinic}
                  onChange={(selectedClinic) =>
                    this.setState({ selectedClinic })
                  }
                  options={listClinic}
                  isClearable={true}
                  placeholder={
                    <FormattedMessage id="admin.manage_doctor.choose_clinic" />
                  }
                />
              </div>
            </div>
          </div>
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          className={
            isSaveInfo ? "btn btn-secondary my-3" : "btn btn-primary my-3"
          }
          onClick={this.handleSaveInfo}
        >
          {isSaveInfo ? (
            <FormattedMessage id="admin.manage_doctor.save" />
          ) : (
            <FormattedMessage id="admin.manage_doctor.add" />
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allSpecialty: state.admin.allSpecialty,
    price: state.admin.price,
    methodPayment: state.admin.methodPayment,
    province: state.admin.province,
    saveInfoDoctor: state.admin.saveInfoDoctor,
    DetailInfoDoctors: state.admin.DetailInfoDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserStart: () => dispatch(getAllUserStart()),
    fetchAllCodeStart: (type) => dispatch(fetchAllCodeStart(type)),
    deleteUserStart: (id) => dispatch(deleteUserStart(id)),
    fetchAllDoctorStart: (id) => dispatch(fetchAllDoctorStart()),
    saveDetailDoctorStart: (data) => dispatch(saveDetailDoctorStart(data)),
    getDetailDoctorStart: (id) => dispatch(getDetailDoctorStart(id)),
    getAllSpecialtyStart: () => dispatch(getAllSpecialtyStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
