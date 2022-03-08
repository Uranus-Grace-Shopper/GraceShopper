import React from "react";
import { connect } from "react-redux";
import { fetchAllUsersThunk, fetchTokenThunk } from "../store/users";

class AdminPortal extends React.Component {
  componentDidMount() {
    // JOE CR: Uer model
    this.props.getUers();
    // JOE CR: Why is this called "getToken"?
    this.props.getToken();
  }
  render() {
    const allUsers = this.props.allUsers;
    return (
      <div>
        <div>
          {allUsers.map((user) => (
            <div key={user.id}>
              <ul> {user.username}</ul>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    allUsers: state.users,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUers: () => dispatch(fetchAllUsersThunk()),
    getToken: () => dispatch(fetchTokenThunk()),
  };
};

export default connect(mapState, mapDispatch)(AdminPortal);
