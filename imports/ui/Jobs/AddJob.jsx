import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css' 

import { Jobs } from '../../api/jobs.js';

export default class AddJob extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display: false,
            tags: [],
        };
    }

    close() {
        this.setState({ display: false, tags: this.state.tags });
    }

    open() {
        this.setState({ display: true, tags: this.state.tags });
    }

    handleSubmit(event) {
        event.preventDefault();

        const company = ReactDOM.findDOMNode(this.refs.companyInput).value.trim();
        const position = ReactDOM.findDOMNode(this.refs.positionInput).value.trim();
        const location = ReactDOM.findDOMNode(this.refs.locationInput).value.trim();
        const state = ReactDOM.findDOMNode(this.refs.stateInput).value.trim();
        const tech_stack = this.state.tags;

        Meteor.call('jobs.insert', company, position, location, state, tech_stack);

        this.close();
    }
    changeTags(tags) {
        this.setState( {display: this.state.display, tags: tags});
    }

    render() {
        return (
            <div>
                <Modal show={this.state.display} onHide={this.close.bind(this) }>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a new job</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup>
                                <ControlLabel>Company</ControlLabel>
                                <FormControl ref="companyInput" type="text" placeholder="Name" />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Position</ControlLabel>
                                <FormControl ref="positionInput" type="text" placeholder="Title" />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Location</ControlLabel>
                                <FormControl ref="locationInput" type="text" placeholder="City, State" />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Tech Stack</ControlLabel>
                                <TagsInput value={this.state.tags ? this.state.tags : []} onChange={this.changeTags.bind(this)}/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>State</ControlLabel>
                                <FormControl ref="stateInput" componentClass="select" placeholder="Select">
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
                            onClick={this.handleSubmit.bind(this) }>
                            Add Job
                        </Button>
                        <Button onClick={this.close.bind(this) }>Cancel</Button>
                    </Modal.Footer>
                </Modal>
                <Button
                    bsStyle="primary"
                    onClick={ this.open.bind(this) }>
                    Add New
                </Button>
            </div>
        );
    }
}