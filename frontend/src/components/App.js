import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import store from "../store";
import Login from './auth/Login';
import Survey from './portal/Survey';
import Landing from './portal/Landing';
import Register from './auth/Register';
import { loadUser } from "../actions/auth";
import Dashboard from './portal/Dashboard';
import PrivateRoute from "./common/PrivateRoute";
import PatientDashboard from './portal/PatientDashboard';
import Activate from './portal/Activate'
import {Role} from './common/role';
import PatientRegister from './portal/patient/PatientForm';
import {Patients, Account, PAccount, Help, Data, Admin, Questionnaire, Information} from './portal/UnImplementedComponents';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {

    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute path="/dashboard" roles={[Role.Doctor]} component={Dashboard} />
            <PrivateRoute path="/newpatient" roles={[Role.Doctor]} component={PatientRegister} />
            <PrivateRoute path="/patients" roles={[Role.Doctor]} component={Patients} />
            <PrivateRoute path="/account" roles={[Role.Doctor]} component={Account} />
            <PrivateRoute path="/help" roles={[Role.Doctor]} component={Help} />
            <PrivateRoute path="/data" roles={[Role.Doctor]} component={Data} />
            <PrivateRoute path="/admin" roles={[Role.Doctor]} component={Admin} />
            <Route path="/survey/:uid/:token" component={Activate} />
            <PrivateRoute path="/home" roles={[Role.Patient]} component={PatientDashboard} />
            <PrivateRoute path="/questionnaire" roles={[Role.Patient]} component={Questionnaire} />
            <PrivateRoute path="/info" roles={[Role.Patient]} component={Information} />
            <PrivateRoute path="/paccount" roles={[Role.Patient]} component={PAccount} />
            {/* <PrivateRoute exact path="/survey" component={Survey} /> */}
          </Switch>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"))