import React from 'react';
import Logout from '../common/Logout';
import Sidebar from "../common/Sidebar";


export const Account = () => (
  <div className="dashboard-container">
    <center>
      <img className='dashboard-icon' src="static/frontend/images/icon.png" />
    </center>
    <div className="pure-g">
      <div className="pure-u-1-6">
        <div className="logout"><Logout /></div>
      </div>
    </div>
    <div className="center dashboard-heading">Welcome</div>
    <div className="pure-g">
      <div className="pure-u-1-6">
      </div>
      <div className="pure-u-5-6">
        <div className="pure-u-4-8 table-heading">Coming Soon</div>
      </div>
      <div className="pure-u-1-6">
        <div className="sidebar">
          <Sidebar type="doctor" />
        </div>
      </div>
    </div>
  </div>
)

export const PAccount = () => (
  <div className="dashboard-container">
    <center>
      <img className='dashboard-icon' src="static/frontend/images/icon.png" />
    </center>
    <div className="pure-g">
      <div className="pure-u-1-6">
        <div className="logout"><Logout /></div>
      </div>
    </div>
    <div className="center dashboard-heading">Welcome</div>
    <div className="pure-g">
      <div className="pure-u-1-6">
      </div>
      <div className="pure-u-5-6">
        <div className="pure-u-4-8 table-heading">Coming Soon</div>
      </div>
      <div className="pure-u-1-6">
        <div className="sidebar">
          <Sidebar type="patient" />
        </div>
      </div>
    </div>
  </div>
)

export const Help = () => (<div className="dashboard-container">
  <center>
    <img className='dashboard-icon' src="static/frontend/images/icon.png" />
  </center>
  <div className="pure-g">
    <div className="pure-u-1-6">
      <div className="logout"><Logout /></div>
    </div>
  </div>
  <div className="center dashboard-heading">Welcome</div>
  <div className="pure-g">
    <div className="pure-u-1-6">
    </div>
    <div className="pure-u-5-6">
      <div className="pure-u-4-8 table-heading">Coming Soon</div>
    </div>
    <div className="pure-u-1-6">
      <div className="sidebar">
        <Sidebar type="doctor" />
      </div>
    </div>
  </div>
</div>)

export const Data = () => (<div className="dashboard-container">
  <center>
    <img className='dashboard-icon' src="static/frontend/images/icon.png" />
  </center>
  <div className="pure-g">
    <div className="pure-u-1-6">
      <div className="logout"><Logout /></div>
    </div>
  </div>
  <div className="center dashboard-heading">Welcome</div>
  <div className="pure-g">
    <div className="pure-u-1-6">
    </div>
    <div className="pure-u-5-6">
      <div className="pure-u-4-8 table-heading">Coming Soon</div>
    </div>
    <div className="pure-u-1-6">
      <div className="sidebar">
        <Sidebar type="doctor" />
      </div>
    </div>
  </div>
</div>)

export const Admin = () => (<div className="dashboard-container">
  <center>
    <img className='dashboard-icon' src="static/frontend/images/icon.png" />
  </center>
  <div className="pure-g">
    <div className="pure-u-1-6">
      <div className="logout"><Logout /></div>
    </div>
  </div>
  <div className="center dashboard-heading">Welcome</div>
  <div className="pure-g">
    <div className="pure-u-1-6">
    </div>
    <div className="pure-u-5-6">
      <div className="pure-u-4-8 table-heading">Coming Soon</div>
    </div>
    <div className="pure-u-1-6">
      <div className="sidebar">
        <Sidebar type="doctor" />
      </div>
    </div>
  </div>
</div>)

export const Patients = () => (<div className="dashboard-container">
  <center>
    <img className='dashboard-icon' src="static/frontend/images/icon.png" />
  </center>
  <div className="pure-g">
    <div className="pure-u-1-6">
      <div className="logout"><Logout /></div>
    </div>
  </div>
  <div className="center dashboard-heading">Welcome</div>
  <div className="pure-g">
    <div className="pure-u-1-6">
    </div>
    <div className="pure-u-5-6">
      <div className="pure-u-4-8 table-heading">Coming Soon</div>
    </div>
    <div className="pure-u-1-6">
      <div className="sidebar">
        <Sidebar type="doctor" />
      </div>
    </div>
  </div>
</div>)

export const Questionnaire = () => (<div className="dashboard-container">
  <center>
    <img className='dashboard-icon' src="static/frontend/images/icon.png" />
  </center>
  <div className="pure-g">
    <div className="pure-u-1-6">
      <div className="logout"><Logout /></div>
    </div>
  </div>
  <div className="center dashboard-heading">Welcome</div>
  <div className="pure-g">
    <div className="pure-u-1-6">
    </div>
    <div className="pure-u-5-6">
      <div className="pure-u-4-8 table-heading">Coming Soon</div>
    </div>
    <div className="pure-u-1-6">
      <div className="sidebar">
        <Sidebar type="patient" />
      </div>
    </div>
  </div>
</div>)

export const Information = () => (<div className="dashboard-container">
  <center>
    <img className='dashboard-icon' src="static/frontend/images/icon.png" />
  </center>
  <div className="pure-g">
    <div className="pure-u-1-6">
      <div className="logout"><Logout /></div>
    </div>
  </div>
  <div className="center dashboard-heading">Welcome</div>
  <div className="pure-g">
    <div className="pure-u-1-6">
    </div>
    <div className="pure-u-5-6">
      <div className="pure-u-4-8 table-heading">Coming Soon</div>
    </div>
    <div className="pure-u-1-6">
      <div className="sidebar">
        <Sidebar type="patient" />
      </div>
    </div>
  </div>
</div>)
