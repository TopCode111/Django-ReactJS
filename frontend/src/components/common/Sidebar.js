import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
export default class Sidebar extends Component {
    constructor() {
        super();
    }

    render() {
        if (this.props.type === "doctor") {
            return (
                <ul className="sidebar-ul">
                    <li className="sidebar-item"><NavLink to="/dashboard" activeClassName="active" className="link-btn"><i className="material-icons sidebar-margin">home</i><span className="sidebar-margin">Dashboard</span></NavLink></li>
                    <li className="sidebar-item"><NavLink exact to="/patients" activeClassName="active" className="link-btn"><i className="material-icons sidebar-margin">folder</i><span className="sidebar-margin">Patients</span></NavLink></li>
                    <li className="sidebar-item"><NavLink to="/account" activeClassName="active" className="link-btn"><i className="material-icons sidebar-margin">person_pin</i><span className="sidebar-margin">Account</span></NavLink></li>
                    <li className="sidebar-item"><NavLink to="/help" activeClassName="active" className="link-btn"><i className="material-icons sidebar-margin">help_outline</i><span className="sidebar-margin">Help</span></NavLink></li>
                    <li className="sidebar-item"><NavLink to="/data" activeClassName="active" className="link-btn"><i className="material-icons sidebar-margin">equalizer</i><span className="sidebar-margin">Data</span></NavLink></li>
                </ul>
            )
        } else {
            return (
                <ul className="sidebar-ul">
                    <li className="sidebar-item"><NavLink to="/home" activeClassName="active" className="link-btn"><i className="material-icons sidebar-margin">home</i><span className="sidebar-margin">Home</span></NavLink></li>
                    <li className="sidebar-item"><NavLink to="/questionnaire" activeClassName="active" className="link-btn"><i className="material-icons sidebar-margin">home</i><span className="sidebar-margin">Questionnaire</span></NavLink></li>
                    <li className="sidebar-item"><NavLink to="/info" activeClassName="active" className="link-btn"><i className="material-icons sidebar-margin">home</i><span className="sidebar-margin">Information</span></NavLink></li>
                    <li className="sidebar-item"><NavLink to="/paccount" activeClassName="active" className="link-btn"><i className="material-icons sidebar-margin">home</i><span className="sidebar-margin">Account</span></NavLink></li>
                </ul>
            )

        }
    }
}