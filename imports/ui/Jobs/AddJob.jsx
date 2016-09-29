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
            positions_tags: [],
            locations_tags: [],
            tech_stack_tags: [],
            links_tags: [],
        };
    }

    close() {
        this.setState({ 
            display: false, 
            positions_tags: this.state.positions_tags,
            locations_tags: this.state.locations_tags,
            tech_stack_tags: this.state.tech_stack_tags,
            links_tags: this.state.links_tags,
         });
    }

    open() {
        this.setState({ 
            display: true, 
            positions_tags: this.state.positions_tags,
            locations_tags: this.state.locations_tags,
            tech_stack_tags: this.state.tech_stack_tags,
            links_tags: this.state.links_tags, 
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const company = ReactDOM.findDOMNode(this.refs.companyInput).value.trim();
        const positions = this.state.positions_tags;
        const locations = this.state.locations_tags;
        const state = ReactDOM.findDOMNode(this.refs.stateInput).value.trim();
        const tech_stack = this.state.tech_stack_tags;
        const links = this.state.links_tags;

        Meteor.call('jobs.insert', company, positions, locations, state, tech_stack, [], [], links);

        this.close();
    }
    changePositionsTags(tags) {
        this.setState( {
            display: this.state.display, 
            positions_tags: tags,
            locations_tags: this.state.locations_tags,
            tech_stack_tags: this.state.tech_stack_tags,
            links_tags: this.state.links_tags,
        });
    }
    changeLocationsTags(tags) {
        this.setState( {
            display: this.state.display, 
            positions_tags: this.state.positions_tags,
            locations_tags: tags,
            tech_stack_tags: this.state.tech_stack_tags,
            links_tags: this.state.links_tags,
        });
    }
    changeTechStackTags(tags) {
        this.setState( {
            display: this.state.display, 
            positions_tags: this.state.positions_tags,
            locations_tags: this.state.locations_tags,
            tech_stack_tags: tags,
            links_tags: this.state.links_tags,
        });
    }
    changeLinksTags(tags) {
        this.setState( {
            display: this.state.display, 
            positions_tags: this.state.positions_tags,
            locations_tags: this.state.locations_tags,
            tech_stack_tags: this.state.tech_stack_tags,
            links_tags: tags,
        });
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
                                <ControlLabel>Positions</ControlLabel>
                                <TagsInput value={this.state.positions_tags ? this.state.positions_tags : []} onChange={this.changePositionsTags.bind(this)}/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Locations</ControlLabel>
                                <TagsInput value={this.state.locations_tags ? this.state.locations_tags : []} onChange={this.changeLocationsTags.bind(this)}/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Tech Stack</ControlLabel>
                                <TagsInput value={this.state.tech_stack_tags ? this.state.tech_stack_tags : []} onChange={this.changeTechStackTags.bind(this)}/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Links</ControlLabel>
                                <TagsInput value={this.state.links_tags ? this.state.links_tags : []} onChange={this.changeLinksTags.bind(this)}/>
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