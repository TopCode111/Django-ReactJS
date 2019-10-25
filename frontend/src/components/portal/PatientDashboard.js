import React, { Component } from 'react'
import { connect } from 'react-redux';
import Sidebar from "../common/Sidebar";
import Logout from "../common/Logout";

import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';

class PatientDashboard extends Component {
    render() {
        let data = [
            {
                icon: "",
                id: 0,
                due: "23/08/17",
                completed: "",
                name: "Name",
                status: "0/24",
                action: "",
                doctor: "Dr Paul Smith",
                contact: "+33 532 742 259"
            },
            {
                icon: "",
                id: 1,
                due: "23/08/17",
                completed: "05/06/17",
                name: "Name",
                status: "15/15",
                action: "None",
                doctor: "Dr Paul Smith",
                contact: "+33 532 742 259"
            },
            {
                icon: "",
                id: 2,
                due: "23/08/17",
                completed: "05/06/17",
                name: "Name",
                status: "15/15",
                action: "None",
                doctor: "Dr Paul Smith",
                contact: "+33 532 742 259"
            },
            {
                icon: "",
                id: 3,
                due: "23/08/17",
                completed: "05/06/17",
                name: "Name",
                status: "15/15",
                action: "None",
                doctor: "Dr Paul Smith",
                contact: "+33 532 742 259"
            },
            {
                icon: "",
                id: 4,
                due: "23/08/17",
                completed: "05/06/17",
                name: "Introduction",
                status: "15/15",
                action: "None",
                doctor: "Dr Jane Allen",
                contact: "+33 599 701 204"
            },
            {
                icon: "",
                id: 5,
                due: "23/08/17",
                completed: "05/06/17",
                name: "Name",
                status: "15/15",
                action: "None",
                doctor: "Dr Paul Smith",
                contact: "+33 532 742 259"
            },
            {
                icon: "",
                id: 6,
                due: "23/08/17",
                completed: "05/06/17",
                name: "Introduction",
                status: "15/15",
                action: "None",
                doctor: "Dr Jane Allen",
                contact: "+33 599 701 204"
            },
            {
                icon: "",
                id: 7,
                due: "23/08/17",
                completed: "05/06/17",
                name: "Name",
                status: "15/15",
                action: "None",
                doctor: "Dr Paul Smith",
                contact: "+33 532 742 259"
            },
            {
                icon: "",
                id: 8,
                due: "23/08/17",
                completed: "05/06/17",
                name: "Introduction",
                status: "15/15",
                action: "None",
                doctor: "Dr Jane Allen",
                contact: "+33 599 701 204"
            }
        ];

        const columns = [{
            dataField: 'due',
            text: 'Due'
        }, {
            dataField: 'completed',
            text: 'Completed'
        }, {
            dataField: 'name',
            text: 'Name'
        }, {
            dataField: 'status',
            text: 'Status'
        }, {
            dataField: 'action',
            text: 'Action Required'
        }, {
            dataField: 'doctor',
            text: 'Doctor'
        }, {
            dataField: 'contact',
            text: 'Contact'
        }];

        const expandRow = {
            onlyOneExpanding: true,
            renderer: row => (
                <div className="row-content left">
                    <button className="start start-btn"><Link to="survey">Start</Link></button>
                </div>
            )
        };

        return (
            <div className="dashboard-container">
                <center>
                    <img className='dashboard-icon' src="static/frontend/images/icon.png" />
                </center>
                <div className="pure-g">
                    <div className="pure-u-1-6">
                        <div className="logout"><Logout /></div>
                    </div>
                </div>
                <div className="center dashboard-heading">Welcome, {this.props.auth.user.first_name + ' ' + this.props.auth.user.last_name}</div>
                <div className="pure-g">
                    <div className="pure-u-1-6">

                    </div>
                    <div className="pure-u-5-6">
                        <div>
                            <div className="pure-u-1-8 table-heading">
                                Questionnaire
                            </div>
                            <div className="pure-u-7-8 right table-action">
                                + Report
                            </div>
                        </div>
                    </div>
                    <div className="pure-u-1-6">
                        <div className="sidebar">
                            <Sidebar type="patient" />
                        </div>
                    </div>
                    <div className="pure-u-5-6">
                        <BootstrapTable keyField='id' data={data} columns={columns} expandRow={expandRow} />

                    </div>

                </div>
                <div className="pure-g">

                    <div className="pure-u-1-1 right table-bottom-action">
                        Close
</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.authReducer
});

export default connect(mapStateToProps)(PatientDashboard);