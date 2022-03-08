import React from "react";
import { connect } from "react-redux";
import { fetchAllUsersThunk } from "../store/users";

class AdminPortal extends React.Component {
  componentDidMount() {
    this.props.getUsers();
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
    getUsers: () => dispatch(fetchAllUsersThunk()),
  };
};

export default connect(mapState, mapDispatch)(AdminPortal);
