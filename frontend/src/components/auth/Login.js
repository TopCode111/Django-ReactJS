import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import Tooltip from "rc-tooltip";
import Header from "./Header";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      formErrors: { email: "", password: "" },
      emailValid: false,
      passwordValid: false,
      formValid: false,
      serverErrors: []
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.non_field_errors)
        this.setState({
          serverErrors: error.msg.non_field_errors
        });
    }
  }

  onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, value) {
    switch (fieldName) {
      case "email":
        this.validateEmail(value);
        break;
      case "password":
        this.validatePassword(value);
        break;
      default:
        break;
    }
  }

  validateEmail(email) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;

    emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    fieldValidationErrors.email = emailValid
      ? ""
      : "Please enter a valid email address";

    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid
      },
      this.validateForm
    );
  }

  validatePassword(password) {
    let fieldValidationErrors = this.state.formErrors;
    let passwordValid = this.state.passwordValid;

    passwordValid = password.length >= 5;
    fieldValidationErrors.password = passwordValid
      ? ""
      : "Password must be greater than 5 characters";

    this.setState(
      {
        formErrors: fieldValidationErrors,
        passwordValid: passwordValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.emailValid && this.state.passwordValid
    });
  }

  onSubmit = e => {
    e.preventDefault();
    this.validateEmail(this.state.email);
    this.validatePassword(this.state.password);
    if (this.state.formValid) {
      this.props.login(this.state.email, this.state.password);
    }
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/dashboard" />;
    }
    const {
      email,
      password,
      formErrors,
      emailValid,
      passwordValid,
      formValid,
      serverErrors
    } = this.state;

    return (
      <div>
        <Header shouldShowBack={false} shouldShowHome={true} />
        <div className="center-child">
          <p className="center signin">Log in</p>
          <form
            className="pure-form pure-form-stacked"
            onSubmit={this.onSubmit}
          >
            <label className="left" htmlFor="email">
              Username
            </label>
            <div className="validation-input">
              <Tooltip
                visible={formErrors.email.length > 0}
                animation="zoom"
                trigger={[]}
                overlayStyle={{ zIndex: 1000 }}
                overlay={<span>{formErrors.email}</span>}
              >
                <input
                  id="email"
                  type="text"
                  name="email"
                  value={email}
                  onChange={this.onChange}
                />
              </Tooltip>
              <span className={"checkmark " + (emailValid ? "" : "hide")}>
                <div className="checkmark_circle"></div>
                <div className="checkmark_stem"></div>
                <div className="checkmark_kick"></div>
              </span>
              <span
                className={
                  "checkmark " + (formErrors.email.length > 0 ? "" : "hide")
                }
              >
                <div className="checkmark_circle_error"></div>
                <div className="checkmark_stem_error"></div>
                <div className="checkmark_kick_error"></div>
              </span>
              {/* <label className="error-message">{formErrors.email}</label> */}
            </div>
            <label className="left" htmlFor="password">
              Passcode
            </label>
            <div className="validation-input">
              <Tooltip
                visible={formErrors.password.length > 0}
                animation="zoom"
                trigger={[]}
                overlayStyle={{ zIndex: 1000 }}
                overlay={<span>{formErrors.password}</span>}
              >
                <input
                  id="password"
                  name="password"
                  className="password"
                  type="password"
                  value={password}
                  onChange={this.onChange}
                />
              </Tooltip>
              <span className={"checkmark " + (passwordValid ? "" : "hide")}>
                <div className="checkmark_circle"></div>
                <div className="checkmark_stem"></div>
                <div className="checkmark_kick"></div>
              </span>
              <span
                className={
                  "checkmark " + (formErrors.password.length > 0 ? "" : "hide")
                }
              >
                <div className="checkmark_circle_error"></div>
                <div className="checkmark_stem_error"></div>
                <div className="checkmark_kick_error"></div>
              </span>
              {/* <label className="error-message">{formErrors.password}</label> */}
            </div>
            <label className="right">Forgot Passcode?</label>
            <div className="center signin-gap">
              <button type="submit" className="form-button center">
                Log in
              </button>
              <label className="error-message">{serverErrors.join()}</label>
            </div>
          </form>
          <div className="center register-gap">
            Don't have account?{" "}
            <span className="register">
              <Link to="/register">Register</Link>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  error: state.errors
});
export default connect(
  mapStateToProps,
  { login }
)(Login);
