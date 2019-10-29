import Tooltip from 'rc-tooltip';
import Select from "react-select";
import { Line } from 'rc-progress';
import Header from '../auth/Header'
import { connect } from 'react-redux';
import React, { Component } from 'react'
import StepZilla from 'react-stepzilla';
import { Link, Redirect } from 'react-router-dom';
import { getQuestions, updateQuestion, postQuestions } from '../../actions/patient'

class Activate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: 33,
      step: 0,
      newUser: {
        consent: "I Accept",
        telemonitoring: ""
      },
      formErrors: {
        consent: "",
        telemonitoring: "",
      },
      validation: {
        consent: false,
        telemonitoring: false,
      },
      questions: {},
      formValid: false,
      serverErrors: [],
      nextBtnCls: 'form-button center patient-next',
    }

    this.updateBtnCls = this.updateBtnCls.bind(this);
    this.updateTelemonitoring = this.updateTelemonitoring.bind(this);
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

  updateBtnCls = value => {
    this.setState({
      ...this.state,
      nextBtnCls: value
    })
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

  componentDidMount(){
    const {uid, token} = this.props.match.params

    this.props.getQuestions(uid, token)

  }
  render() {

    const { serverErrors } = this.state;

    const steps = [
      { name: 'FirstStep', component: <FirstStep patient={this.props.patient} step={this.state.step} /> },
      { name: 'SurveyQuestions', component: <SurveyQuestions questions={this.props.patient.questions} updateQuestion={this.props.updateQuestion} updateBtnCls={this.updateBtnCls} /> },
      // { name: 'TelemonitoringConfirmation', component: <TelemonitoringConfirmation step={this.state.step} updateTelemonitoring={this.updateTelemonitoring} newUser={this.state.newUser}/> },
      // { name: 'ConsentAcceptance', component: <ConsentAcceptance urlParams={this.props.match.params} answers={this.props.patient.questions} postQuestions={this.props.postQuestions} step={this.state.step} /> },
      { name: 'FinalStep', component: <FinalStep patient={this.props.patient} urlParams={this.props.match.params} answers={this.props.patient.questions} postQuestions={this.props.postQuestions} step={this.state.step} /> }
    ];

    return (
      <div>
        <div>
			<a href="/"><img className='dashboard-icon' src="static/frontend/images/icon.png" /></a>
		</div>
        <div className="center-child survey-width">
          <div className={'loader ' + ((this.props.patient.isQuestionLoading)?'':'hide')}>Loading...</div>
          <span className={this.props.patient.isQuestionLoading?'hide':''}>
          <StepZilla showSteps={false} nextButtonCls={this.state.nextBtnCls} backButtonCls="prev-btn" steps={steps} onStepChange={this.stepChange} startAtStep={0} ref={this.stepRef} nextBtnRef={this.nextBtnRef} />
          </span>
          <label className="error-message">{serverErrors}</label>
          {/* <div className="line-progress">
            {this.state.step < 5 && <span> <Line percent={this.state.percentage} strokeWidth="3" strokeColor="#53206e" trailColor="#f4f4f4" /> {this.state.percentage}%</span>}
          </div> */}
        </div>
      </div>
    )
  }
}


class FirstStep extends Component {

  goBack() {
    this.props.jumpToStep(this.props.step - 1);
  }

  goForward(){
    this.props.jumpToStep(this.props.step + 1);
  }

  render() {
      return (
        <div className="step1">
		  <div className="question-intro-text">
          Welcome <b>{this.props.patient.full_name}</b>, thank you for connecting for your follow-up. Please start to answer the questions<br/>
		  </div>
          <div className="center"><button className="form-button center patient-next" onClick={()=>this.goForward()}>Start</button></div>
        </div>
      )
  }
}

class Question extends Component {

  componentDidMount() {
    if (this.props.updateBtnCls) {
      this.props.updateBtnCls('form-button center patient-next')
    }
  }

  componentDidUpdate(prevProps) {

    const { updateBtnCls } = this.props;
    if (updateBtnCls !== prevProps.updateBtnCls) {
      this.props.updateBtnCls('form-button center patient-next')
    }
  }

  isValidated() {
    return this.props.question.answer !== undefined;
  }

  render() {
    return (
      <form className="pure-form pure-form-stacked" key={this.props.question.id}>
        <label className="left survey-question" htmlFor="firstName">{this.props.question.question}</label>
        <div className="pure-g survey-options">
          {this.props.question.medicalquestionchoices_set.map(element=> <label key={element.id} className="choice"><input type="radio" name="answers" value={element.choice} onClick={() => this.props.updateQuestionAns({...this.props.question, answer: element.choice})} />{element.choice}</label>)}
        </div>
      </form>
    )
  }
}

class SurveyQuestions extends Component {

  constructor(props) {
    super(props);

    this.updateQuestionAns = this.updateQuestionAns.bind(this);
  }

  componentDidMount() {
    if(this.props.questions.length>1){
      this.props.updateBtnCls('form-button center patient-next hide')
    }
  }

  componentWillUnmount() {
    this.props.updateBtnCls('form-button center patient-next')
  }

  goBack() {
    this.props.jumpToStep(this.props.step - 1);
  }

  isValidated() {
    return this.props.questions.reduce((total, curr) => total && curr.answer !== undefined, true)
  }

  updateQuestionAns(question) {
    this.props.updateQuestion(question)
  }


  render() {
    const steps = this.props.questions.map((element, index) => ({ name: `question${element.id}`, component: <Question question={element} updateQuestionAns={this.updateQuestionAns} updateBtnCls={(this.props.questions.length - 1 === index) ? this.props.updateBtnCls : undefined} /> }))
    if (steps.length > 0) {
      return (
        <div>
		  <div>
          		<p className="center signin survey-header">Please answer the following questions</p>
          </div>
          <StepZilla steps={steps} showSteps={false} nextButtonCls="form-button center register-next" nextTextOnFinalActionStep={"Accept"} backButtonCls="prev-btn" />
          <span className="notice">* All questions are mandatory</span>
        </div>
      )
    } else {
      return (<h3>No Questions</h3>)
    }
  }
}

class TelemonitoringConfirmation extends Component {

  constructor(props) {
    super(props);
  }

  isValidated() {
    return this.props.newUser.telemonitoring !== '';
  }

  goBack() {
    this.props.jumpToStep(this.props.step - 1);
  }

  render() {

    return (
      <form className="pure-form pure-form-stacked">

        <label className="left survey-question" htmlFor="firstName">Do you want Telemonitoring?</label>
        <div className="pure-g survey-options">
          <div className="pure-u-1-2">
            <div>
              <button type="button" className={"survey-yes-no-btn " + ((this.props.newUser.telemonitoring && this.props.newUser.telemonitoring === "YES") ? "active" : "")} onClick={() => this.props.updateTelemonitoring("YES")}>Yes</button>
            </div>
          </div>
          <div className="pure-u-1-2">
            <div>
              <button type="button" className={"survey-yes-no-btn " + ((this.props.newUser.telemonitoring && this.props.newUser.telemonitoring === "NO") ? "active" : "")} onClick={() => this.props.updateTelemonitoring("NO")}>No</button>
            </div>
          </div>
        </div>

      </form>
    )
  }
}

class ConsentAcceptance extends Component {

  goBack() {
    this.props.jumpToStep(this.props.step - 1);
  }

  isValidated() {
    const {uid, token} = this.props.urlParams

    this.props.postQuestions(uid, token, this.props.answers)
    return true;
  }

  render() {

    return (
      <form className="pure-form pure-form-stacked">

        <h2>Survey Description</h2>
        <h3>By clicking on the “Next” button below, you are providing “written instructions” to Telemonica 360 authorizing Telemonica 360 to obtain your personal and health information. You authorize Telemonica 360 to obtain such information solely to confirm your identity and display your health details data to you.</h3>
      </form>
    )
  }
}

class FinalStep extends Component {

  componentDidMount(){
    const {uid, token} = this.props.urlParams

    this.props.postQuestions(uid, token, this.props.answers)
    return true;
  }

  goBack() {
    this.props.jumpToStep(this.props.step - 1);
  }

  render() {

    if (this.props.patient.isQuestionPosted) {
      return (
 <div>
        <div class="survey-last-page">
		  Thank you <b>{this.props.patient.full_name}</b> to have answer the questions. Your doctor will review your
		  answers and contact you if necessary. You will receive your next questionnarie soon. You may now go
		  to your portal or disconnect. We wish you a nice day.		  	  
		</div>
        <div className="center">
		    <a href="/">
		  	    <button className="form-button center patient-next" onClick={()=>this.goForward()}>Dashboard</button>
  		    </a>
		 </div>
		  </div>
      )
    } else {
      return (
        <h2 className="center error-message">
          There was some error with survey. Please try again later.<br/><br/>
          If the problem persists, please contact administrator.
        </h2>
      )
    }
  }
}

const mapStateToProps = state => ({
  patient: state.patientReducer
});

export default connect(mapStateToProps, { getQuestions, updateQuestion, postQuestions })(Activate);