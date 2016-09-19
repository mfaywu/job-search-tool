import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';

import { Jobs } from '../api/jobs.js';

export default class EditJob extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display: false,
        };
    }

    close() {
        this.setState({ display: false });
    }

    open() {
        this.setState({ display: true });
    }

    handleSubmit(event) {
        event.preventDefault();

        let company = ReactDOM.findDOMNode(this.refs.companyInput).value.trim();
        company = company == '' ? this.props.job.company : company;
        let position = ReactDOM.findDOMNode(this.refs.positionInput).value.trim();
        position = position == '' ? this.props.job.position : position;
        let location = ReactDOM.findDOMNode(this.refs.locationInput).value.trim();
        location = location == '' ? this.props.job.location : location;
        let state = ReactDOM.findDOMNode(this.refs.stateInput).value.trim();
        state = state == '' ? this.props.job.state : state;

        const id = this.props.job._id;

        Jobs.update(id, { $set: {
            company,
            position,
            location,
            state,
        }
        });

        this.close();
    }


    render() {
        return (
            <div>
                <Modal show={this.state.display} onHide={this.close.bind(this) }>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Job</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup>
                                <ControlLabel>Company</ControlLabel>
                                <FormControl ref="companyInput" type="text" placeholder={this.props.job.company}/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Position</ControlLabel>
                                <FormControl ref="positionInput" type="text" placeholder={this.props.job.position}/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Location</ControlLabel>
                                <FormControl ref="locationInput" type="text" placeholder={this.props.job.location}/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>State</ControlLabel>
                                <FormControl ref="stateInput" componentClass="select" placeholder={this.props.job.state}>
                                    <option value="Not Started">Not Started</option>
                                    <option value="Applied">Applied</option>
                                    <option value="Phone Screen">Phone Screen</option>
                                    <option value="Onsite">OnSite</option>
                                    <option value="Got Offer">Got Offer</option>
                                    <option value="No Offer">No Offer</option>
                                    <option value="Accepted">Accepted</option>
                                    <option value="Declined">Declined</option>
                                </FormControl>
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="info"
                            type="submit"
                            onClick={this.handleSubmit.bind(this)}>
                            Edit Job
                        </Button>
                        <Button onClick={this.close.bind(this) }>Cancel</Button>
                    </Modal.Footer>
                </Modal>
                <Button
                    bsStyle="primary"
                    bsSize="small"
                    onClick={ this.open.bind(this) }>
                    Edit
                </Button>
            </div>
        );
    }
}

EditJob.propTypes = {
  job: PropTypes.object.isRequired,
};