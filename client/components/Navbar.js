import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { Home } from "./Home";

const Navbar = ({ handleClick, isLoggedIn, username }) => (
  <div>
    <nav>
      <Link className="navlink" to="/">
        <img src="/logo.png" className="logo" />
      </Link>
      <Home username={username} />
      <div>
        <Link to="/products">All Wines</Link>
      </div>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
      <div className="cart">
        <Link to="/cart">Cart</Link>
      </div>
    </nav>
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    username: state.auth.username,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
