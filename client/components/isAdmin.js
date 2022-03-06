import React from "react";
import users from '../store/users'
import { connect } from "react-redux";

class isAdmin extends React.Component {
 
    render() {
        console.log('this.props',this.props)
        console.log('locostorage',localStorage.token)
    return (
      <div className="container-main">
      <p>this is admim</p>
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
      fetchUsers: () => dispatch(users()),
    };
  };
  
  export default connect(mapState, mapDispatch)(isAdmin);