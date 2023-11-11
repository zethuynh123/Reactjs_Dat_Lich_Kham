import React, { Component } from "react";
import { connect } from "react-redux";
import { getExtraInfoDoctorByIdStart } from "../../../store/actions/adminActions";
import NumberFormat from "react-number-format";
import { FormattedMessage } from "react-intl";
import { createNewClinic } from "../../../services/userService";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { toast } from "react-toastify";
import {
  getAllUserStart,
  deleteUserStart,
  fetchAllDoctorStart,
  saveDetailDoctorStart,
  getDetailDoctorStart,
  fetchAllCodeStart,
} from "../../../store/actions/adminActions";
import "react-toastify/dist/ReactToastify.css";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import "./ManageClinic.scss";
import Lightbox from "react-image-lightbox";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //save markdown
      contentMarkdown: "",
      contentHTML: "",
      isSaveInfo: false,

      //save doctor info table
      nameClinic: "",
      addressClinic: "",
      previewImg: "",
      isOpen: false,
    };
  }

  reset = () => {
    this.setState({
      contentMarkdown: "",
      contentHTML: "",
      nameClinic: "",
      addressClinic: "",
      previewImg: "",
      isOpen: false,
    });
  };

  handleSaveInfo = async () => {
    console.log({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      preImge: this.state.previewImg,
      nameClinic: this.state.nameClinic,
      address: this.state.addressClinic,
    });

    try {
      let result = await createNewClinic({
        contentHTML: this.state.contentHTML,
        contentMarkdown: this.state.contentMarkdown,
        nameClinic: this.state.nameClinic,
        previewImg: this.state.previewImg,
        address: this.state.addressClinic,
      });
      if (result.status === 200) {
        toast.success(result.message);
        this.reset();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  handleDeleteImage = (e) => {
    e.stopPropagation();
    this.state.previewImg !== "" && this.setState({ previewImg: "" });
  };

  handleChangeImage = async (e) => {
    let data = e.target.files;
    let file = data[0];

    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({ previewImg: base64 });
    }
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  async componentDidMount() {
    const { doctorId, getExtraInfoDoctorByIdStart } = this.props;
  }

  componentDidUpdate(prevProps) {
    const { language, InfoDoctorById } = this.props;

    if (prevProps.language !== language) {
    }
  }

  render() {
    const { isSaveInfo, nameClinic, addressClinic, previewImg, isOpen } =
      this.state;
    const { language } = this.props;
    return (
      <div className="manage-specialty-container p-3">
        <div className="manage-specialty-title text-center text-uppercase fs-3 fw-bold my-3">
          <FormattedMessage id="admin.manage_clinic.title" />
        </div>
        <div className="manage-specialty-editor">
          <div className="info-specialty d-flex flex-column">
            <div className="d-flex gap-3 mb-3">
              <div className="content-left">
                <label className="fs-5 text-secondary">
                  <FormattedMessage id="admin.manage_clinic.name_clinic" />
                </label>
                <FormattedMessage id="admin.manage_clinic.name_clinic">
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
              <div className="content-right">
                <label className="fs-5 text-secondary">
                  <FormattedMessage id="admin.manage_clinic.image_clinic" />
                </label>

                <div className="preview-img-container d-flex gap-4">
                  <div className="name">
                    <input
                      type="file"
                      id="previewImg"
                      hidden
                      onChange={this.handleChangeImage}
                    />
                    <label className="label-upload" htmlFor="previewImg">
                      <FormattedMessage id="manage-user.upload" />{" "}
                      <i className="fas fa-upload"></i>
                    </label>
                  </div>
                  <div className="preview-image-wrapper">
                    <div
                      className="preview-image"
                      style={{
                        background: `center / contain no-repeat url(${previewImg})`,
                        cursor: previewImg ? "pointer" : "default",
                      }}
                      onClick={() =>
                        previewImg !== "" && this.setState({ isOpen: true })
                      }
                    >
                      {previewImg !== "" ? (
                        <span
                          className="preImage-close-icon"
                          onClick={this.handleDeleteImage}
                        >
                          {" "}
                          <i className="fas fa-times"></i>
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex gap-3 mb-3">
              <div className="content-left">
                <label className="fs-5 text-secondary">
                  <FormattedMessage id="admin.manage_clinic.address_clinic" />
                </label>
                <FormattedMessage id="admin.manage_clinic.address_clinic">
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
            </div>
          </div>
          <MdEditor
            style={{ height: "300px" }}
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
            <FormattedMessage id="admin.manage_clinic.save" />
          ) : (
            <FormattedMessage id="admin.manage_clinic.add" />
          )}
        </button>
        {isOpen && (
          <Lightbox
            mainSrc={previewImg}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
