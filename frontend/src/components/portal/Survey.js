import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import StepZilla from 'react-stepzilla';
import { Line } from 'rc-progress';
import Select from "react-select";


class SurveyStepOne extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <form className="pure-form pure-form-stacked">

                <label className="left survey-question" htmlFor="firstName">Are you or John bedridden, or incontinent, or requiring constant nursing care?</label>
                <div className="pure-g survey-options">
                    <div className="pure-u-1-2">
                        <div>
                            <button className={"survey-yes-no-btn " + (this.props.step1 ? 'active' : '')}>Yes</button>
                        </div>
                    </div>
                    <div className="pure-u-1-2">
                        <div>
                            <button className={"survey-yes-no-btn " + (this.props.step1 ? '' : 'active')}>No</button>
                        </div>
                    </div>
                </div>

            </form>
        )
    }
}

class SurveyStepTwo extends Component {
    render() {
        return (
            <form className="pure-form pure-form-stacked">

                <label className="left" htmlFor="email">Email</label>
                <div className="validation-input">
                    <input id="email" type="email" className="register-width" />
                    <span className="checkmark">
                        <div className="checkmark_circle"></div>
                        <div className="checkmark_stem"></div>
                        <div className="checkmark_kick"></div>
                    </span>
                </div>
                <label className="left" htmlFor="phone">Phone</label>
                <div className="validation-input">
                    <input id="phone" className="phone register-width" />
                    <span className="checkmark">
                        <div className="checkmark_circle"></div>
                        <div className="checkmark_stem"></div>
                        <div className="checkmark_kick"></div>
                    </span>
                </div>

            </form>
        )
    }
}

class SurveyStepThree extends Component {
    render() {
        return (
            <form className="pure-form pure-form-stacked register-width">

                <label className="left" htmlFor="date">Date of birth</label>
                <div className="validation-input">
                    <div className="date">
                        <input id="date" value="30" />
                        <span className="checkmark">
                            <div className="checkmark_circle"></div>
                            <div className="checkmark_stem"></div>
                            <div className="checkmark_kick"></div>
                        </span>
                    </div>
                    <div className="month">
                        <input id="month" value="November" />
                        <span className="checkmark">
                            <div className="checkmark_circle"></div>
                            <div className="checkmark_stem"></div>
                            <div className="checkmark_kick"></div>
                        </span>
                    </div>
                    <div className="year">
                        <input id="year" value="Year" />
                        <span className="checkmark">
                            <div className="checkmark_circle"></div>
                            <div className="checkmark_stem"></div>
                            <div className="checkmark_kick"></div>
                        </span>
                    </div>

                </div>
                <label className="left" htmlFor="passcode">Passcode</label>
                <div className="validation-input">
                    <input id="register-passcode" className="passcode" type="password" />
                    <span className="checkmark">
                        <div className="checkmark_circle"></div>
                        <div className="checkmark_stem"></div>
                        <div className="checkmark_kick"></div>
                    </span>
                </div>
                <label className="right error-message">Passcode must be 5 digits</label>

            </form>
        )
    }
}

class SurveyStepFour extends Component {
    render() {

        let states = [
            {
                value: 1,
                label: "NSW",
            },
            {
                value: 2,
                label: "NY",
            }
        ];

        let countries = [
            { value: 'australia', label: 'Australia' },
            { value: 'belgium', label: 'Belgium' },
            { value: 'germany', label: 'Germany' },
        ];

        return (
            <form className="pure-form pure-form-stacked">

                <label className="left" htmlFor="address">Address</label>
                <div className="valvalueation-input">
                    <input id="register-address" className="address register-width" />
                    <span className="checkmark">
                        <div className="checkmark_circle"></div>
                        <div className="checkmark_stem"></div>
                        <div className="checkmark_kick"></div>
                    </span>
                </div>

                <div className="validation-input">
                    <div className="city">
                        <label className="left" htmlFor="city">City</label>
                        <input id="city" />
                        <span className="checkmark">
                            <div className="checkmark_circle"></div>
                            <div className="checkmark_stem"></div>
                            <div className="checkmark_kick"></div>
                        </span>
                    </div>
                    <div className="state">
                        <label className="left" htmlFor="state">State</label>
                        <Select isSearchable={false} isClearable={false} classNamePrefix="state-single" options={states} />
                    </div>
                    <div className="postcode">
                        <label className="left" htmlFor="postcode">Postcode</label>
                        <input id="postcode" />
                        <span className="checkmark">
                            <div className="checkmark_circle"></div>
                            <div className="checkmark_stem"></div>
                            <div className="checkmark_kick"></div>
                        </span>
                    </div>

                </div>
                <div>
                    <label className="left" htmlFor="country">Country</label>
                    <Select isSearchable={false} isClearable={false} classNamePrefix="country-single" options={countries} />
                </div>
            </form>
        )
    }
}

class SurveyStepFive extends Component {

    render() {
        let specialities = [
            { value: 'special1', label: 'Special One' },
            { value: 'special2', label: 'Special Two' },
        ];
        return (
            <form className="pure-form pure-form-stacked register-width">

                <label className="left" htmlFor="speciality">Speciality</label>
                <Select isSearchable={false} isClearable={false} classNamePrefix="speciality-single" options={specialities} />

                <label className="left" htmlFor="other">Other</label>
                <div className="validation-input">
                    <input id="other" className="other register-width" type="text" />

                </div>
                <div className="center signin-gap">
                    <button type="submit" className="form-button center">Qnre</button>
                </div>
            </form>
        )
    }
}


export default class Survey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            percentage: 45,
            step: 0,
            step1: false
        }
    }


    stepChange = (step) => {
        var stepPercentageMapping = {
            0: 45,
            1: 62,
            2: 74,
            3: 80,
            4: 99,
        }
        this.setState({ percentage: stepPercentageMapping[step] });
    }

    render() {

        const steps = [
            { name: 'SurveyStepOne', component: <SurveyStepOne step1={this.state.step1} /> },
            { name: 'SurveyStepTwo', component: <SurveyStepTwo /> },
            // { name: 'SurveyStepThree', component: <SurveyStepThree /> },
            // { name: 'SurveyStepFour', component: <SurveyStepFour /> },
            // { name: 'SurveyStepFive', component: <SurveyStepFive /> }
        ];


        return (
            <div>
                <div className="right language"><span>FR</span>/<span className="selected">EN</span></div>

                <div className="back-link" onClick={() => this.props.jumpToStep(0)} >Back</div>
                <div className="center-child register-width">
                    <p className="center signin">Questionnaire</p>
                    <StepZilla showSteps={false} nextButtonCls="form-button center" backButtonCls="prev-btn" steps={steps} onStepChange={this.stepChange} />
                    <div className="line-progress">
                        <Line percent={this.state.percentage} strokeWidth="3" strokeColor="#53206e" trailColor="#f4f4f4" />{this.state.percentage}%
                    </div>
                </div>
            </div>
        )
    }
}