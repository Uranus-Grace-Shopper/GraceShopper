import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { Home } from "./Home";

const Navbar = ({ handleClick, isLoggedIn, username, isAdmin }) => (
  <div id="navbar">
    <nav>
      <Link className="navlink" to="/">
        <img src="/logo.png" className="logo" />
      </Link>
      <Home username={username} />
      <div>
        <Link to="/products">All Wines</Link>
      </div>
      {isAdmin ? <Link to="/admin">Admin Portal</Link> : <div></div>}

      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div id="nav-login">
          <Link id="login-text" to="/login">
            Login
          </Link>
          <Link id="signup-text" to="/signup">
            Sign-Up
          </Link>
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
    isAdmin: state.auth.isAdmin,
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
