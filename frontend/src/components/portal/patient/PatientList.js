import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getProtocols, getPatients, deletePatient } from '../../../actions/patient';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';

class PatientList extends Component {

    componentDidMount() {
        this.props.getProtocols();
        this.props.getPatients();
    }

    deletePatient = (id) => {
        var confirmation = confirm('Are you sure?')
        if (confirmation) {
            this.props.deletePatient(id);
        }
    }

    render() {
        const columns = [{
            dataField: 'name',
            text: 'Name'
        }, {
            dataField: 'alert',
            text: 'Alert'
        }, {
            dataField: 'pname',
            text: 'Protocol'
        }, {
            dataField: 'inclusion',
            text: 'Inclusion'
        }, {
            dataField: 'monitor',
            text: 'Monitoring'
        }, {
            dataField: 'expected_date',
            text: 'Expected Date'
        }, {
            dataField: 'answer',
            text: 'Answer'
        }, {
            dataField: 'indicators',
            text: 'Indicators'
        }, {
            dataField: 'message',
            text: 'Message'
        }, {
            dataField: 'decision',
            text: 'Decision'
        }];

        const expandRow = {
            onlyOneExpanding: true,
            renderer: row => (
                <div className="row-content">
                    <div className="row-one">
                        <div className="inner">
                            <div className="inner-heading">Age</div>
                            <div className="inner-content">{row.age}</div>
                        </div>
                        <div className="inner">
                            <div className="inner-heading">Sex</div>
                            <div className="inner-content">M</div>
                        </div>
                        <div className="inner">
                            <div className="inner-heading">Action Required</div>
                            <div className="inner-content">None</div>
                        </div>
                        <div className="inner">
                            <div className="inner-heading">Notes</div>
                            <div className="inner-content">-</div>
                        </div>
                    </div>
                    <div className="row-two">
                        <div className="inner">
                            <div className="inner-heading">Date</div>
                            <div className="inner-content">-</div>
                        </div>
                        <div className="inner">
                            <div className="inner-heading">Diagnostic</div>
                            <div className="inner-content">-</div>
                        </div>
                    </div>
                    <div className="row-three">
                        <div className="inner">
                            <div className="inner-heading">Phone</div>
                            <div className="inner-content">{row.user.phone}</div>
                        </div>
                    </div>
                </div>
            )
        };
		
        const protocols = this.props.protocols.reduce(function(map, obj) {
			map[obj.id] = obj.name;
			return map;
		}, {});
		
        const data = this.props.patients.map(e => {
            e.name = e.user.first_name + " " + e.user.last_name;
            e.inclusion_date = e.inclusion_date && e.inclusion_date.split('T')[0] || '';
			e.uniq = e.id + "_" + e.pname

			/*
			 * "Choose" or name of the protocol. "Choose" if the doctor validates the patient but not the protocol.
			 * In this release we will assume the protocol is always validated.
			 */
			
			e.pname = protocols[e.protocol];
			
			// TODO: Has the doctor validated protocol and medical questionaire?			
			e.inclusion = "Include";
			
			// TODO: Is the doctor monitoring progress?
			e.monitor = "No";
			
			// TODO: Has the patient answered it? Neeed to colour it.
 			e.answer = "TBD";
			
			// TODO: Check on results
			e.indicators = "";
			
			// TODO: Text reported by patient
			e.message = "";
			
			// TODO: Doctor's decision
			e.decision = "";	
			
			// TODO:
			e.alert = "";
			
            return e;
        });
		
        const { ExportCSVButton } = CSVExport;

        return (
            <ToolkitProvider
                keyField="uniq"
                data={data}
                columns={columns}

                exportCSV={{
                    fileName: 'patients.csv',
                    separator: ',',
                    ignoreHeader: false,
                    noAutoBOM: false
                }}>
                {
                    props => (
                        <div>
                            <div className={"left"} style={{marginTop:"40px"}}>
                                <Link className="add-patient" to="/newpatient">+ Add</Link>
                                <ExportCSVButton {...props.csvProps}>Export</ExportCSVButton>
                            </div>
							<div style={{width:"100%"}}>
								<BootstrapTable keyField='id' {...props.baseProps} expandRow={expandRow} />						
							</div>
                        </div>
                    )}
            </ToolkitProvider>
        )
    }
}

const mapStateToProps = state => ({
    patients: state.patientReducer.patients,
    protocols: state.patientReducer.protocols	
});

export default connect(mapStateToProps, { getProtocols, getPatients, deletePatient })(PatientList);