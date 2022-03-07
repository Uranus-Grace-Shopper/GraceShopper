import React from "react";
import { connect } from "react-redux";
import { fetchUsers, fetchToken } from "../store/user";

class AdminPortal extends React.Component {
  componentDidMount() {
    this.props.getUsers();

    // this.props.getToken();
  }
  render() {
    console.log("is this propssss", this.props);
    // const isAdmin = this.props.isAdmin;
    const users = this.props.allUsers || [];
    console.log("users", users);
    // const token = this.props.token;
    // console.log("is this tokenn?????", token)
    // if (token) {

      // const users = this.props.allUsers;
      return (
        <div>
          <div className="div-all-users">
            {users.map((user) => (
              <div key={user.id} className="div-each-user">
                <div className="div-username">{user.username}</div>
              </div>
            ))}
          </div>
        </div>
      );
    
    // } else {
    //   return <div>"Access Denied"</div>;
    // }
  }
}

const mapState = (state) => {
  console.log("what is stateeee", state);
  return {
    allUsers: state.user
    // token: state.users.token
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUsers: () => dispatch(fetchUsers()),
    // getToken: () => dispatch(fetchToken())
  };
};

export default connect(mapState, mapDispatch)(AdminPortal);
