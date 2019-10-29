import React, { Component } from 'react'
import { patientRegister } from '../../../actions/auth'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import StepZilla from 'react-stepzilla';
import { Line } from 'rc-progress';
import Select from "react-select";
import Tooltip from 'rc-tooltip';
import Header from '../../auth/Header'
import { getProtocols, updateQuestion } from '../../../actions/patient'

class PatientRegisterStepOne extends Component {

  constructor(props) {
    super(props);
  }

  isValidated() {
    this.props.validateField('first_name', this.props.newUser.first_name);
    this.props.validateField('last_name', this.props.newUser.last_name);
    this.props.validateDate(this.props.newUser.date);
    this.props.validateMonth(this.props.newUser.month);
    this.props.validateYear(this.props.newUser.year);
    return this.props.validation.first_name && this.props.validation.last_name && this.props.validation.date && this.props.validation.month && this.props.validation.year;
  }

  render() {
    let dates = [
      { value: '01', label: '01' },
      { value: '02', label: '02' },
      { value: '03', label: '03' },
      { value: '04', label: '04' },
      { value: '05', label: '05' },
      { value: '06', label: '06' },
      { value: '07', label: '07' },
      { value: '08', label: '08' },
      { value: '09', label: '09' },
      { value: '10', label: '10' },
      { value: '11', label: '11' },
      { value: '12', label: '12' },
      { value: '13', label: '13' },
      { value: '14', label: '14' },
      { value: '15', label: '15' },
      { value: '16', label: '16' },
      { value: '17', label: '17' },
      { value: '18', label: '18' },
      { value: '19', label: '19' },
      { value: '20', label: '20' },
      { value: '21', label: '21' },
      { value: '22', label: '22' },
      { value: '23', label: '23' },
      { value: '24', label: '24' },
      { value: '25', label: '25' },
      { value: '26', label: '26' },
      { value: '27', label: '27' },
      { value: '28', label: '28' },
      { value: '29', label: '29' },
      { value: '30', label: '30' },
      { value: '31', label: '31' },
    ];

    let months = [
      { value: '01', label: 'January' },
      { value: '02', label: 'February' },
      { value: '03', label: 'March' },
      { value: '04', label: 'April' },
      { value: '05', label: 'May' },
      { value: '06', label: 'June' },
      { value: '07', label: 'July' },
      { value: '08', label: 'August' },
      { value: '09', label: 'September' },
      { value: '10', label: 'October' },
      { value: '11', label: 'November' },
      { value: '12', label: 'December' }
    ]

    let years = [
      { value: '1990', label: '1990' },
      { value: '1991', label: '1991' },
      { value: '1992', label: '1992' },
      { value: '1993', label: '1993' },
      { value: '1994', label: '1994' },
      { value: '1995', label: '1995' },
      { value: '1996', label: '1996' },
      { value: '1997', label: '1997' },
      { value: '1998', label: '1998' },
      { value: '1999', label: '1999' },
      { value: '2000', label: '2000' },
      { value: '2001', label: '2001' },
      { value: '2002', label: '2002' },
      { value: '2003', label: '2003' },
      { value: '2004', label: '2004' },
      { value: '2005', label: '2005' },
      { value: '2006', label: '2006' },
      { value: '2007', label: '2007' },
      { value: '2008', label: '2008' },
      { value: '2009', label: '2009' },
      { value: '2010', label: '2010' },
      { value: '2011', label: '2011' },
      { value: '2012', label: '2012' },
      { value: '2013', label: '2013' },
      { value: '2014', label: '2014' },
      { value: '2015', label: '2015' },
      { value: '2016', label: '2016' },
      { value: '2017', label: '2017' },
      { value: '2018', label: '2018' },
      { value: '2019', label: '2019' }

    ]
    return (
      <form className="pure-form pure-form-stacked">
        <label className="left" htmlFor="firstName">First name</label>
        <div className="validation-input">
          <Tooltip
            visible={this.props.formErrors.first_name.length > 0}
            trigger={[]}
            overlayStyle={{ zIndex: 1000 }}
            overlay={<span>{this.props.formErrors.first_name}</span>}
          >
            <input id="first_name" name="first_name" value={this.props.newUser.first_name} onChange={this.props.onChange} className="register-width" type="text" />
          </Tooltip>
          <span className={'checkmark ' + ((this.props.validation.first_name) ? '' : 'hide')}>
            <div className="checkmark_circle"></div>
            <div className="checkmark_stem"></div>
            <div className="checkmark_kick"></div>
          </span>
          <span className={'checkmark ' + ((this.props.formErrors.first_name.length > 0) ? '' : 'hide')}>
            <div className="checkmark_circle_error"></div>
            <div className="checkmark_stem_error"></div>
            <div className="checkmark_kick_error"></div>
          </span>
        </div>
        <label className="left" htmlFor="lastName">Last name</label>
        <div className="validation-input">
          <Tooltip
            visible={this.props.formErrors.last_name.length > 0}
            trigger={[]}
            overlayStyle={{ zIndex: 1000 }}
            overlay={<span>{this.props.formErrors.last_name}</span>}
          >
            <input id="last_name" name="last_name" value={this.props.newUser.last_name} onChange={this.props.onChange} className="lastName register-width" type="text" />
          </Tooltip>
          <span className={'checkmark ' + ((this.props.validation.last_name) ? '' : 'hide')}>
            <div className="checkmark_circle"></div>
            <div className="checkmark_stem"></div>
            <div className="checkmark_kick"></div>
          </span>
          <span className={'checkmark ' + ((this.props.formErrors.last_name.length > 0) ? '' : 'hide')}>
            <div className="checkmark_circle_error"></div>
            <div className="checkmark_stem_error"></div>
            <div className="checkmark_kick_error"></div>
          </span>
        </div>
        <label className="left" htmlFor="date">Date of birth</label>

        <div className="validation-input">

          <div className="date">
            <Select name={"date"} value={this.props.newUser.date} onChange={this.props.onDateChange} isSearchable={false} isClearable={false} classNamePrefix="date-single" options={dates} placeholder={'Date'} menuPlacement="top"/>
            <span className={'checkmark date-select-checkmark ' + ((this.props.validation.date) ? '' : 'hide')}>
              <div className="checkmark_circle"></div>
              <div className="checkmark_stem"></div>
              <div className="checkmark_kick"></div>
            </span>
            <span className={'checkmark date-select-checkmark ' + ((this.props.formErrors.date.length > 0) ? '' : 'hide')}>
              <div className="checkmark_circle_error"></div>
              <div className="checkmark_stem_error"></div>
              <div className="checkmark_kick_error"></div>
            </span>
          </div>
          <div className="month">
            <Select name={"month"} value={this.props.newUser.month} onChange={this.props.onMonthChange} isSearchable={false} isClearable={false} classNamePrefix="month-single" options={months} placeholder={'Month'} menuPlacement="top"/>
            <span className={'checkmark month-select-checkmark ' + ((this.props.validation.month) ? '' : 'hide')}>
              <div className="checkmark_circle"></div>
              <div className="checkmark_stem"></div>
              <div className="checkmark_kick"></div>
            </span>
            <span className={'checkmark month-select-checkmark ' + (this.props.formErrors.month.length > 0 ? '' : 'hide')}>
              <div className="checkmark_circle_error"></div>
              <div className="checkmark_stem_error"></div>
              <div className="checkmark_kick_error"></div>
            </span>
          </div>
          <div className="year">
            <Tooltip
              visible={this.props.formErrors.year.length > 0 || this.props.formErrors.month.length > 0 || this.props.formErrors.date.length > 0}
              trigger={[]}
              overlayStyle={{ zIndex: 1000 }}
              overlay={<span>
                <div>{this.props.formErrors.date}</div>
                <div>{this.props.formErrors.month}</div>
                <div>{this.props.formErrors.year}</div>
              </span>}
            >
              <Select name={"year"} value={this.props.newUser.year} onChange={this.props.onYearChange} isSearchable={false} isClearable={false} classNamePrefix="year-single" options={years} placeholder={'Year'} menuPlacement="top"/>
            </Tooltip>
            <span className={'checkmark year-select-checkmark ' + ((this.props.validation.year) ? '' : 'hide')}>
              <div className="checkmark_circle"></div>
              <div className="checkmark_stem"></div>
              <div className="checkmark_kick"></div>
            </span>
            <span className={'checkmark year-select-checkmark ' + (this.props.formErrors.year.length > 0 ? '' : 'hide')}>
              <div className="checkmark_circle_error"></div>
              <div className="checkmark_stem_error"></div>
              <div className="checkmark_kick_error"></div>
            </span>
          </div>
        </div>
      </form>
    )
  }
}

class PatientRegisterStepTwo extends Component {

  constructor(props) {
    super(props);
  }

  goBack() {
    this.props.jumpToStep(this.props.step - 1);
  }

  isValidated() {
    this.props.validateProtocol(this.props.newUser.protocol);
    return this.props.validation.protocol;
  }

  render() {

    let protocols = this.props.protocols.map(element => ({
      value: element.id, label: element.name
    })
    );

    return (
      <form className="pure-form pure-form-stacked">

        <div>
          <label className="left" htmlFor="protocol">Protocol</label>
          <Tooltip
            visible={this.props.formErrors.protocol.length > 0}
            trigger={[]}
            overlayStyle={{ zIndex: 1000 }}
            overlay={<span>{this.props.formErrors.protocol}</span>}
          >
            <Select name={"protocol"} value={this.props.newUser.protocol} onChange={this.props.onProtocolChange} isSearchable={false} isClearable={false} classNamePrefix="protocol-single" options={protocols} placeholder={'Select Protocol'} />
          </Tooltip>
          <span className={'checkmark protocol-select-checkmark ' + ((this.props.validation.protocol) ? '' : 'hide')}>
            <div className="checkmark_circle"></div>
            <div className="checkmark_stem"></div>
            <div className="checkmark_kick"></div>
          </span>
          <span className={'checkmark protocol-select-checkmark ' + (this.props.formErrors.protocol.length > 0 ? '' : 'hide')}>
            <div className="checkmark_circle_error"></div>
            <div className="checkmark_stem_error"></div>
            <div className="checkmark_kick_error"></div>
          </span>
        </div>
      </form>
    )
  }
}

class PatientRegisterStepSix extends Component {

  constructor(props) {
    super(props);
  }

  getValidDateFormat = date => {
    return new Date(date).getFullYear() + '-' + new Date(date).getMonth().toString().padStart(1, "0") + '-' + new Date(date).getDate().toString().padStart(1, "0")
  }

  isValidated() {
    this.props.validateField('email', this.props.newUser.email);
    this.props.validateField('phone', this.props.newUser.phone);
    this.props.validateField('password', this.props.newUser.password);

    if (this.props.validation.email && this.props.validation.phone && this.props.validation.password) {
      let patient = this.props.newUser;
      let extras = this.props.extras;

      patient.dob = patient.year.value + '-' + patient.month.value + '-' + patient.date.value
      patient.speciality = "None";
      patient.address = 'Update this field';
      patient.city = 'Update this field';
      patient.state = 'Update this field';
      patient.postcode = 'Update this field';
      patient.country = 'Update this field';

      extras.inclusion_date = new Date().toISOString();
      extras.answered_date = null;
      extras.expected_date = null;
      extras.protocol_id = patient.protocol.value;
      extras.decision = null;
      extras.consent = patient.consent;
      extras.telemonitoring = patient.teleMonitoring === "YES" ? true : false;
      extras.answers = this.props.questions.map(element=>({"answer": element.answer, "question_id": element.id}));
      

      let patientCopy = {...patient}
      delete patientCopy.protocol
      delete patientCopy.date;
      delete patientCopy.month;
      delete patientCopy.year;
      delete patientCopy.consent;
      delete patientCopy.telemonitoring;

      this.props.patientRegister({ user: patientCopy, ...extras });
    }

    return this.props.validation.email && this.props.validation.phone;
  }

  goBack() {
    this.props.jumpToStep(this.props.step - 1);
  }


  render() {
    return (
      <form className="pure-form pure-form-stacked">

        <label className="left" htmlFor="email">Email</label>
        <div className="validation-input">
          <Tooltip
            visible={this.props.formErrors.email.length > 0}
            trigger={[]}
            overlayStyle={{ zIndex: 1000 }}
            overlay={<span>{this.props.formErrors.email}</span>}
          >
            <input id="email" name="email" value={this.props.newUser.email} onChange={this.props.onChange} className="register-width" type="text" />
          </Tooltip>
          <span className={'checkmark ' + ((this.props.validation.email) ? '' : 'hide')}>
            <div className="checkmark_circle"></div>
            <div className="checkmark_stem"></div>
            <div className="checkmark_kick"></div>
          </span>
          <span className={'checkmark ' + ((this.props.formErrors.email.length > 0) ? '' : 'hide')}>
            <div className="checkmark_circle_error"></div>
            <div className="checkmark_stem_error"></div>
            <div className="checkmark_kick_error"></div>
          </span>
        </div>
        <label className="left" htmlFor="passcode">Password</label>
        <div className="validation-input">
          <Tooltip
            visible={this.props.formErrors.password.length > 0}
            trigger={[]}
            overlayStyle={{ zIndex: 1000 }}
            overlay={<span>{this.props.formErrors.password}</span>}
          >
            <input id="register-passcode" name="password" value={this.props.newUser.password} onChange={this.props.onChange} className="passcode" type="password" />
          </Tooltip>
          <span className={'checkmark ' + ((this.props.validation.password) ? '' : 'hide')}>
            <div className="checkmark_circle"></div>
            <div className="checkmark_stem"></div>
            <div className="checkmark_kick"></div>
          </span>
        </div>
        <label className="left" htmlFor="phone">Phone</label>
        <div className="validation-input">
          <Tooltip
            visible={this.props.formErrors.phone.length > 0}
            trigger={[]}
            overlayStyle={{ zIndex: 1000 }}
            overlay={<span>{this.props.formErrors.phone}</span>}
          >
            <input id="phone" name="phone" value={this.props.newUser.phone} onChange={this.props.onChange} className="register-width" type="text" />
          </Tooltip>
          <span className={'checkmark ' + ((this.props.validation.phone) ? '' : 'hide')}>
            <div className="checkmark_circle"></div>
            <div className="checkmark_stem"></div>
            <div className="checkmark_kick"></div>
          </span>
          <span className={'checkmark ' + ((this.props.formErrors.phone.length > 0) ? '' : 'hide')}>
            <div className="checkmark_circle_error"></div>
            <div className="checkmark_stem_error"></div>
            <div className="checkmark_kick_error"></div>
          </span>
        </div>

      </form>
    )
  }
}

class PatientRegisterStepSeven extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: ''
    }
  }

  goBack() {
    this.props.jumpToStep(this.props.step - 1);
  }

  componentDidUpdate(prevProps){
    const props  = this.props
    if (props !== prevProps){
      let d = new Date()
      d.setMinutes(d.getMinutes()+5)
      this.setState({date: d.toLocaleString()})
    }
  }

  render() {

    if (this.props.newPatient) {
      return (
        <h2>
          You have now registered {this.props.newPatient.user.first_name} {this.props.newPatient.user.last_name} to the protocol {this.props.protocol}. {this.props.newPatient.user.first_name} {this.props.newPatient.user.last_name} will receive the first questionnaire on {this.state.date}. You may now go back to your <Link to="/dashboard">dashboard</Link>.
        </h2>
      )
    } else {
      return (
        <h2 className="center">
          There was some error with registration fields. Please fix the errors and register again.<br /><br /><span className="go-back pointer" onClick={() => this.props.jumpToStep(0)}>Go Back to step 1</span>
        </h2>
      )
    }
  }
}

export class PatientRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: 50,
      step: 0,
      newUser: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        date: "",
        month: '',
        year: '',
        password: "",
        protocol: "",
        consent: "I Accept",
        telemonitoring: "",
        address: "",
        city: "",
        state: "",
        postcode: "",
      },
      formErrors: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        date: "",
        month: '',
        year: '',
        password: "",
        protocol: "",
        consent: "",
        telemonitoring: "",
      },
      validation: {
        first_name: false,
        last_name: false,
        email: false,
        phone: false,
        date: false,
        month: false,
        year: false,
        password: false,
        protocol: false,
        consent: false,
        telemonitoring: false,
      },
      questions: {},
      formValid: false,
      serverErrors: [],
      nextBtnCls: 'form-button center patient-next',
      extras: {
        inclusion_date: "",
        expected_date: "",
        answered_date: "",
        rank: 0,
        barthel: 0,
        decision: ""
      }
    }

    this.onChange = this.onChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);

    this.validateField = this.validateField.bind(this);

    this.validateDate = this.validateDate.bind(this);
    this.validateMonth = this.validateMonth.bind(this);
    this.validateYear = this.validateYear.bind(this);
    this.validateProtocol = this.validateProtocol.bind(this);
    this.updateBtnCls = this.updateBtnCls.bind(this);
    this.updateTelemonitoring = this.updateTelemonitoring.bind(this);
  }

  componentDidMount() {
    this.props.getProtocols();
  }

  stepRef = React.createRef();
  nextBtnRef = React.createRef();

  updateBtnCls = value => {
    this.setState({
      ...this.state,
      nextBtnCls: value
    })
  }

  stepChange = (step) => {
    var stepPercentageMapping = {
      0: 50,
      1: 60,
      2: 90,
      3: 100
    }

    this.setState({
      step: step,
      percentage: stepPercentageMapping[step]
    });
  }

  onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      newUser: {
        ...this.state.newUser,
        [name]: value
      }
    },
      () => { this.validateField(name, value) }
    )
  }

  updateTelemonitoring = value => {
    this.setState({
      newUser: {
        ...this.state.newUser,
        telemonitoring: value
      }
    },
      () => { this.validateTelemonitoring(value) })
  }

  onDateChange = args => {
    const value = args;
    this.setState({
      newUser: {
        ...this.state.newUser,
        date: value
      }
    },
      () => { this.validateDate(value) }
    )
  }

  onMonthChange = args => {
    const value = args;
    this.setState({
      newUser: {
        ...this.state.newUser,
        month: value
      }
    },
      () => { this.validateMonth(value) }
    )
  }

  onYearChange = args => {
    const value = args;
    this.setState({
      newUser: {
        ...this.state.newUser,
        year: value
      }
    },
      () => { this.validateYear(value) }
    )
  }

  onProtocolChange = args => {
    const value = args;
    this.setState({
      newUser: {
        ...this.state.newUser,
        protocol: value
      }
    },
      () => { this.validateProtocol(value) }
    )
  }

  validateField(fieldName, value) {

    switch (fieldName) {
      case 'first_name':
        this.validatefirst_name(value);
        break;
      case 'last_name':
        this.validatelast_name(value);
        break;
      case 'email':
        this.validateEmail(value);
        break;
      case 'password':
        this.validatePassword(value);
        break;
      case 'phone':
        this.validatePhone(value);
        break;
      default:
        break;
    }
  }

  validateTelemonitoring(teleMonitoring) {
    let fieldValidationErrors = this.state.formErrors
    let teleMonitoringValid = this.state.validation.teleMonitoring;

    teleMonitoringValid = teleMonitoring.length > 0;
    fieldValidationErrors.teleMonitoring = teleMonitoringValid ? '' : 'Cannot be blank';

    this.setState({
      formErrors: fieldValidationErrors,
      validation: {
        ...this.state.validation,
        teleMonitoring: teleMonitoringValid
      }
    }, this.validateForm);
  }

  validatefirst_name(first_name) {
    let fieldValidationErrors = this.state.formErrors
    let first_nameValid = this.state.validation.first_name;

    first_nameValid = first_name.length > 0;
    fieldValidationErrors.first_name = first_nameValid ? '' : 'Cannot be blank';

    this.setState({
      formErrors: fieldValidationErrors,
      validation: {
        ...this.state.validation,
        first_name: first_nameValid
      }
    }, this.validateForm);
  }

  validatelast_name(last_name) {
    let fieldValidationErrors = this.state.formErrors
    let last_nameValid = this.state.validation.last_name;

    last_nameValid = last_name.length > 0;
    fieldValidationErrors.last_name = last_nameValid ? '' : 'Cannot be blank';

    this.setState({
      formErrors: fieldValidationErrors,
      validation: {
        ...this.state.validation,
        last_name: last_nameValid
      }
    }, this.validateForm);
  }

  validatePhone(phone) {
    let fieldValidationErrors = this.state.formErrors
    let phoneValid = this.state.validation.phone;

    let re = /[\+0-9]+/
    phoneValid = phone.length > 0;
    fieldValidationErrors.phone = phoneValid ? '' : 'Cannot be blank';
    if (phone.length > 0) {
      phoneValid = re.test(phone)
      fieldValidationErrors.phone = phoneValid ? '' : 'Invalid phone number';
    }

    this.setState({
      formErrors: fieldValidationErrors,
      validation: {
        ...this.state.validation,
        phone: phoneValid
      }
    }, this.validateForm);
  }

  validateDate(date) {
    let fieldValidationErrors = this.state.formErrors
    let dateValid = this.state.validation.date;

    dateValid = false;

    if (typeof (date) === "object" && Object.keys(date).indexOf("value") > -1 && date.value.length > 0)
      dateValid = true;

    fieldValidationErrors.date = dateValid ? '' : 'Date cannot be blank';

    this.setState({
      formErrors: fieldValidationErrors,
      validation: {
        ...this.state.validation,
        date: dateValid
      }
    }, this.validateForm);
  }

  validateMonth(month) {
    let fieldValidationErrors = this.state.formErrors
    let monthValid = this.state.validation.month;

    monthValid = false;

    if (typeof (month) === "object" && Object.keys(month).indexOf("value") > -1 && month.value.length > 0)
      monthValid = true;

    fieldValidationErrors.month = monthValid ? '' : 'Month cannot be blank';

    this.setState({
      formErrors: fieldValidationErrors,
      validation: {
        ...this.state.validation,
        month: monthValid
      }
    }, this.validateForm);
  }

  validateYear(year) {
    let fieldValidationErrors = this.state.formErrors
    let yearValid = this.state.validation.year;

    yearValid = false;

    if (typeof (year) === "object" && Object.keys(year).indexOf("value") > -1 && year.value.length > 0)
      yearValid = true;

    fieldValidationErrors.year = yearValid ? '' : 'Year cannot be blank';

    this.setState({
      formErrors: fieldValidationErrors,
      validation: {
        ...this.state.validation,
        year: yearValid
      }
    }, this.validateForm);
  }

  validateProtocol(protocol) {
    let fieldValidationErrors = this.state.formErrors
    let protocolValid = this.state.validation.protocol;

    protocolValid = false;

    if (typeof (protocol) === "object" && Object.keys(protocol).indexOf("value") > -1 && (protocol.value.length > 0 || protocol.value > 0))
      protocolValid = true;

    fieldValidationErrors.protocol = protocolValid ? '' : 'Cannot be blank';

    this.setState({
      formErrors: fieldValidationErrors,
      validation: {
        ...this.state.validation,
        protocol: protocolValid
      }
    }, this.validateForm);
  }

  validateEmail(email) {
    let fieldValidationErrors = this.state.formErrors
    let emailValid = this.state.emailValid;

    emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    fieldValidationErrors.email = emailValid ? '' : 'is invalid';

    this.setState({
      formErrors: fieldValidationErrors,
      validation: {
        ...this.state.validation,
        email: emailValid
      }
    }, this.validateForm);
  }

  validatePassword(password) {
    let fieldValidationErrors = this.state.formErrors
    let passwordValid = this.state.passwordValid;

    passwordValid = password.length >= 5;
    fieldValidationErrors.password = passwordValid ? '' : 'Passcode must be 5 characters or more';

    this.setState({
      ...this.state,
      formErrors: fieldValidationErrors,
      validation: {
        ...this.state.validation,
        password: passwordValid
      }
    }, this.validateForm);
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if(Object.keys(error.msg).length===0){
        this.setState({ serverErrors: ''})
        return;
      }
      if (error.msg.non_field_errors) this.setState({ serverErrors: error.msg.non_field_errors.join() })
      if (error.msg.user.email) this.setState({ serverErrors: error.msg.user.email.join() })
    }
  }

  backToStep() {
    this.stepRef.current.refs.activeComponent.goBack()
  }

  render() {

    if (this.props.isAuthenticated) {
      return <Redirect to="/dashboard" />;
    }

    const { serverErrors, isAuthenticated } = this.state;

    const steps = [
      { name: 'PatientRegisterStepOne', component: <PatientRegisterStepOne newUser={this.state.newUser} validation={this.state.validation} formErrors={this.state.formErrors} onChange={this.onChange} validateField={this.validateField} onDateChange={this.onDateChange} onMonthChange={this.onMonthChange} onYearChange={this.onYearChange} validateField={this.validateField} validateDate={this.validateDate} validateMonth={this.validateMonth} validateYear={this.validateYear} /> },
      { name: 'PatientRegisterStepTwo', component: <PatientRegisterStepTwo step={this.state.step} newUser={this.state.newUser} validation={this.state.validation} formErrors={this.state.formErrors} onChange={this.onChange} onStateChange={this.onStateChange} onProtocolChange={this.onProtocolChange} validateField={this.validateField} validateProtocol={this.validateProtocol} protocols={this.props.patient.protocols} /> },
      // { name: 'PatientRegisterStepThree', component: <PatientRegisterStepThree questions={this.props.patient.questions} updateQuestion={this.props.updateQuestion} updateBtnCls={this.updateBtnCls} /> },
      // { name: 'PatientRegisterStepFour', component: <PatientRegisterStepFour step={this.state.step} newUser={this.state.newUser} validation={this.state.validation} formErrors={this.state.formErrors} onChange={this.onChange} validateField={this.validateField} updateTelemonitoring={this.updateTelemonitoring} /> },
      // { name: 'PatientRegisterStepFive', component: <PatientRegisterStepFive step={this.state.step} newUser={this.state.newUser} validation={this.state.validation} formErrors={this.state.formErrors} onChange={this.onChange} /> },
      { name: 'PatientRegisterStepSix', component: <PatientRegisterStepSix step={this.state.step} newUser={this.state.newUser} validation={this.state.validation} formErrors={this.state.formErrors} onChange={this.onChange} validateField={this.validateField} isAuthenticated={isAuthenticated} extras={this.state.extras} patientRegister={this.props.patientRegister} questions={this.props.patient.questions}/> },
      { name: 'PatientRegisterStepSeven', component: <PatientRegisterStepSeven step={this.state.step} protocol={this.state.newUser.protocol.label} newPatient={this.props.auth.newPatient} isAuthenticated={isAuthenticated} /> }
    ];

    return (
      <div>
		<img className='dashboard-icon' src="static/frontend/images/icon.png" />
        <Header showRight={false} shouldShowBack={(this.state.step !== 0) && !isAuthenticated} backToStep={this.backToStep} stepRef={this.stepRef} />
        
        <div className="center-child register-width">
          <p className="center signin">Add Patient</p>
          <div className={'loader ' + ((this.props.auth.isPatientLoading)?'':'hide')}>Loading...</div>
          <div className={(this.props.auth.isPatientLoading)?'center':'hide'}>Adding Patient</div>
          <span className={(this.props.auth.isPatientLoading)?'hide':''}>
          <StepZilla  showSteps={false} nextButtonCls={this.state.nextBtnCls} backButtonCls="prev-btn" steps={steps} onStepChange={this.stepChange} startAtStep={0} nextTextOnFinalActionStep={"Register"} ref={this.stepRef} nextBtnRef={this.nextBtnRef} />
          
          { serverErrors.length>0 &&
            <label  className="error-message"><div>Errors:</div>{serverErrors}</label>
          }
        
          <div className="line-progress">
            {this.state.step < 5 && <span> <Line percent={this.state.percentage} strokeWidth="3" strokeColor="#53206e" trailColor="#f4f4f4" /> {this.state.percentage}%</span>}
          </div>
          </span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.authReducer,
  patient: state.patientReducer,
  error: state.errors
});

export default connect(mapStateToProps, { patientRegister, getProtocols, updateQuestion })(PatientRegister);