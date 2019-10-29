import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

export class Logout extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };
  render() {
      return (
          <span onClick={this.props.logout} >
            Log out
          </span>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authReducer
});

export default connect(
  mapStateToProps,
  { logout }
)(Logout);
