import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllUser, deleteUser } from "../../services/userService";
import ModalAddUser from "./ModalAddUser";
import ModalEditUser from "./ModalEditUser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUSer: [],
      modalAddUser: false,
      modalEditUser: false,
      userInfo: "",
    };
  }

  handleAddNewUser = () => {
    this.setState({ modalAddUser: true });
  };

  handleEditUser = (userInfo) => {
    this.setState({ userInfo });
    this.setState({ modalEditUser: true });
  };

  handleDelete = async (id) => {
    let result = await deleteUser(id);
    if (result.status === 200) {
      toast.success(result.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        closeOnClick: true,
        closeButton: false,
      });
      await this.handleGetAllUser();
    } else {
      toast.error(result.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        closeOnClick: true,
        closeButton: false,
      });
    }
  };

  toggle = (nameModal) => {
    if (nameModal === "add") {
      this.setState({ modalAddUser: !this.state.modalAddUser });
    } else {
      this.setState({ modalEditUser: !this.state.modalEditUser });
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

  render() {
    return (
      <div className="container">
        <ModalAddUser
          modal={this.state.modalAddUser}
          toggle={() => this.toggle("add")}
          getAllUser={this.handleGetAllUser}
        />

        <ModalEditUser
          modal={this.state.modalEditUser}
          toggle={() => this.toggle("edit")}
          getAllUser={this.handleGetAllUser}
          data={this.state.userInfo}
        />
        <div className="text-center fs-2 mt-2 fw-bold text-secondary">
          Manage users table
        </div>
        <button
          className="btn btn-outline-primary border border-primary px-2"
          onClick={() => this.handleAddNewUser()}
        >
          <i className="fas fa-user-plus"></i> Add new user
        </button>
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
            {this.state.dataUSer.length > 0 &&
              this.state.dataUSer.map((userInfo, i) => {
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
                        onClick={() => this.handleEditUser(userInfo)}
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
