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
} from "../../../store/actions/adminActions";
import "react-toastify/dist/ReactToastify.css";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import "./ManageDoctor.scss";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "chocolate1", label: "Chocolate1" },
  { value: "chocolate2", label: "Chocolate2" },
];

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDoctor: "",
      contentMarkdown: "",
      contentHTML: "",
      description: "",
      listDoctor: [],
      isSaveInfo: false,
    };
  }

  async componentDidMount() {
    this.props.fetchAllDoctorStart();
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

    if (prevProps.saveInfoDoctor !== this.props.saveInfoDoctor) {
      if (this.props.saveInfoDoctor.status === 200) {
      }
    }
    if (prevProps.DetailInfoDoctors !== this.props.DetailInfoDoctors) {
      if (this.props.DetailInfoDoctors.Markdown) {
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

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleChange = async (selectedDoctor) => {
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
    });
    this.reset();
  };
  render() {
    const { listDoctor, isSaveInfo } = this.state;

    return (
      <div className="manage-doctor-container p-3">
        <div className="manage-doctor-title text-center text-uppercase fs-3 fw-bold my-3">
          Thêm thông tin Doctor
        </div>
        <div className="manage-doctor-editor">
          <div className="info-doctor d-flex gap-3 mb-3">
            <div className="content-left">
              <label className="fs-5 text-secondary">Chọn bác sĩ</label>
              <Select
                value={this.state.selectedDoctor}
                onChange={this.handleChange}
                options={listDoctor}
                isClearable={true}
              />
            </div>
            <div className="content-right w-60">
              <label className="fs-5 text-secondary">
                Thông tin giới thiệu
              </label>
              <textarea
                className="form-control"
                rows="4"
                value={this.state.description}
                onChange={(e) => this.setState({ description: e.target.value })}
              ></textarea>
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
          {isSaveInfo ? "Lưu thông tin" : "Tạo thông tin"}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    saveInfoDoctor: state.admin.saveInfoDoctor,
    DetailInfoDoctors: state.admin.DetailInfoDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserStart: () => dispatch(getAllUserStart()),
    deleteUserStart: (id) => dispatch(deleteUserStart(id)),
    fetchAllDoctorStart: (id) => dispatch(fetchAllDoctorStart()),
    saveDetailDoctorStart: (data) => dispatch(saveDetailDoctorStart(data)),
    getDetailDoctorStart: (id) => dispatch(getDetailDoctorStart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
