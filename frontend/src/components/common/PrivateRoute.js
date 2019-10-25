import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, auth, roles, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (auth.isLoading) {
        return <h2>Loading...</h2>;
      }
      
      if (!auth.isAuthenticated) {
        return <Redirect to="/login" />;
      }

      if(roles && roles.indexOf(auth.user.role) === -1){
        return <Redirect to="/home" />;
      }

      return <Component {...props} />;
    }}
  />
);
const mapStateToProps = state => ({
  auth: state.authReducer
});

export default connect(mapStateToProps)(PrivateRoute);