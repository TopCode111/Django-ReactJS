import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Role } from "../common/role";

const Landing = ({ auth }) => {
  return (
    <div>
      <div className="right language">
        {!auth.isAuthenticated && (
          <span className="language">
            <Link to="register">REGISTER</Link>
          </span>
        )}
        {!auth.isAuthenticated && (
          <span className="language">
            <Link to="login">LOG IN</Link>
          </span>
        )}
        {auth.isAuthenticated && auth.user.role === Role.Doctor && (
          <span className="language">
            <Link to="dashboard">DASHBOARD</Link>
          </span>
        )}
        {auth.isAuthenticated && auth.user.role === Role.Patient && (
          <span className="language">
            <Link to="home">HOME</Link>
          </span>
        )}
        {/* <span className="language">CONTACT</span>
        <span className="language">
          <span>FR</span> / <span className="selected">EN</span>
        </span> */}
      </div>
      <div className="landing-parent">
        <div className="landing-child landing-title">
          <div>
            <img
              className="landing-icon"
              src="static/frontend/images/icon.png"
            />
          </div>
          <span className="intro">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </span>
          <br />
          <button className="primary-btn learn-more">Learn More</button>
        </div>
        <div className="landing-child">
          <img
            src="static/frontend/images/telemonica-image-1.png"
            className="img-responsive"
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.authReducer
});
export default connect(mapStateToProps)(Landing);
