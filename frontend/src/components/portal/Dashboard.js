import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import Sidebar from "../common/Sidebar";
import Logout from "../common/Logout";
import { connect } from 'react-redux';
import PatientList from './patient/PatientList';

class Dashboard extends Component {
    render() {
        return (
            <div className="dashboard-container">
                <img className='dashboard-icon' src="static/frontend/images/icon.png" />
                     <div className="logout right"><Logout /></div>
			    <div>
					 <div className="center dashboard-heading">Welcome, Dr {this.props.auth.user.first_name + ' ' + this.props.auth.user.last_name}</div>
			    </div>
                <div className="pure-g">
                    <div className="pure-u-1-6">
                        <div className="sidebar">
                            <Sidebar type="doctor" />
                        </div>
                    </div>
                    <div className="pure-u-5-6">
                        <PatientList tableTitle="Patients" doctor={this.props.auth.user} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.authReducer
});

export default connect(mapStateToProps)(Dashboard);