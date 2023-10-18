import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllUser, deleteUser } from "../../../services/userService";
import { toast } from "react-toastify";
import {
  getAllUserStart,
  deleteUserStart,
} from "../../../store/actions/adminActions";
import "react-toastify/dist/ReactToastify.css";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

class TableUserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUSer: [],
      modalAddUser: false,
      modalEditUser: false,
      userInfo: "",
    };
  }

  // handleEditUser = (userInfo) => {
  //   this.setState({ userInfo });
  //   this.setState({ modalEditUser: true });
  // };

  handleDelete = async (id) => {
    if (id) {
      await this.props.deleteUserStart(id);
      await this.props.getAllUserStart();
    }
  };

  handleGetAllUser = async () => {
    let result = await getAllUser("All");
    if (result.status === 200) {
      this.setState({ dataUSer: result.dataUser });
    }
  };

  async componentDidMount() {
    this.handleGetAllUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.users !== this.props.users) {
      this.setState({ dataUSer: this.props.users });
    }
  }

  render() {
    const { dataUSer } = this.state;
    return (
      <div className="container mt-3 mb-5" style={{ marginBottom: "50px" }}>
        <table className="table caption-top table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Email</th>
              <th scope="col">First name</th>
              <th scope="col">Last name</th>
              <th scope="col">Address</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {dataUSer &&
              dataUSer.length > 0 &&
              dataUSer?.map((userInfo, i) => {
                return (
                  <tr key={userInfo.id}>
                    <th scope="row">{i + 1}</th>
                    <td>{userInfo.email}</td>
                    <td>{userInfo.firstName}</td>
                    <td>{userInfo.lastName}</td>
                    <td>{userInfo.address}</td>
                    <td>
                      <button
                        className="btn btn-outline-secondary border border-secondary px-2 me-2"
                        onClick={() =>
                          this.props.handleChooseUserToEdit(userInfo)
                        }
                      >
                        <i className="fas fa-edit fs-6"></i>
                      </button>
                      <button
                        className="btn btn-outline-danger  border border-danger px-2"
                        onClick={() => this.handleDelete(userInfo.id)}
                      >
                        <i className="fas fa-trash-alt fs-6"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { users: state.admin.users };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserStart: () => dispatch(getAllUserStart()),
    deleteUserStart: (id) => dispatch(deleteUserStart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUserManage);
