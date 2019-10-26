import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <div className="header-parent">
        <div className="header-language">
          <span className="language">
            <Link to="/">HOME</Link>
          </span>

          {/* <span className="language">CONTACT</span>

			<span>FR</span>/<span className="selected">EN</span> */}
        </div>
        {this.props.shouldShowBack && (
          <div
            className="back-link pointer"
            onClick={() => this.props.backToStep()}
          >
            {" "}
            
          </div>
        )}
        {this.props.shouldShowHome && (
          <div
            className="header-element"
            onClick={() => (window.location.href = "/")}
          >
            
          </div>
        )}
      </div>
    );
  }
}
