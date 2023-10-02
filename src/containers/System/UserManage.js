import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllUser } from "../../services/userService";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUSer: [],
    };
  }

  async componentDidMount() {
    let result = await getAllUser("All");
    if (result.status === 200) {
      this.setState({ dataUSer: result.dataUser });
    }
  }

  render() {
    return (
      <div className="container">
        <table class="table caption-top table-striped table-hover">
          <caption className="text-center fs-2 fw-bold">
            Manage users table
          </caption>
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
                  <tr>
                    <th scope="row">{i + 1}</th>
                    <td>{userInfo.email}</td>
                    <td>{userInfo.firstName}</td>
                    <td>{userInfo.lastName}</td>
                    <td>{userInfo.address}</td>
                    <td>
                      <button class="btn btn-outline-secondary border border-secondary px-2 me-2">
                        <i class="fas fa-edit fs-6"></i>
                      </button>
                      <button class="btn btn-outline-danger  border border-danger px-2">
                        <i class="fas fa-trash-alt fs-6"></i>
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
