import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

import { Jobs } from '../../api/jobs.js';

export default class EditJob extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display: false,
            positions_tags: this.props.job.positions ? this.props.job.positions : [],
            locations_tags: this.props.job.locations ? this.props.job.locations : [],
            tech_stack_tags: this.props.job.tech_stack ? this.props.job.tech_stack : [],
            pros_tags: this.props.job.pros ? this.props.job.pros : [],
            cons_tags: this.props.job.cons ? this.props.job.cons : [],
            links_tags: this.props.job.links ? this.props.job.links : [],
        };
    }

    close() {
        this.setState({
            display: false,
            positions_tags: this.state.positions_tags,
            locations_tags: this.state.locations_tags,
            tech_stack_tags: this.state.tech_stack_tags,
            pros_tags: this.state.pros_tags,
            cons_tags: this.state.cons_tags,
            links_tags: this.state.links_tags,
        });
    }

    open() {
        this.setState({
            display: true,
            positions_tags: this.state.positions_tags,
            locations_tags: this.state.locations_tags,
            tech_stack_tags: this.state.tech_stack_tags,
            pros_tags: this.state.pros_tags,
            cons_tags: this.state.cons_tags,
            links_tags: this.state.links_tags,
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        let company = ReactDOM.findDOMNode(this.refs.companyInput).value.trim();
        company = company == '' ? this.props.job.company : company;
        const positions = this.state.positions_tags;
        const locations = this.state.locations_tags;
        let state = ReactDOM.findDOMNode(this.refs.stateInput).value.trim();
        state = state == '' ? this.props.job.state : state;
        const tech_stack = this.state.tech_stack_tags;
        const pros = this.state.pros_tags;
        const cons = this.state.cons_tags;
        const links = this.state.links_tags;

        const id = this.props.job._id;

        Meteor.call('jobs.update', id, company, positions, locations, state, tech_stack, pros, cons, links);

        this.close();
    }
    changePositionsTags(tags) {
        this.setState({
            display: this.state.display,
            positions_tags: tags,
            locations_tags: this.state.locations_tags,
            tech_stack_tags: this.state.tech_stack_tags,
            pros_tags: this.state.pros_tags,
            cons_tags: this.state.cons_tags,
            links_tags: this.state.links_tags,
        });
    }
    changeLocationsTags(tags) {
        this.setState({
            display: this.state.display,
            positions_tags: this.state.positions_tags,
            locations_tags: tags,
            tech_stack_tags: this.state.tech_stack_tags,
            pros_tags: this.state.pros_tags,
            cons_tags: this.state.cons_tags,
            links_tags: this.state.links_tags,
        });
    }
    changeTechStackTags(tags) {
        this.setState({
            display: this.state.display,
            positions_tags: this.state.positions_tags,
            locations_tags: this.state.locations_tags,
            tech_stack_tags: tags,
            pros_tags: this.state.pros_tags,
            cons_tags: this.state.cons_tags,
            links_tags: this.state.links_tags,
        });
    }
    changeProsTags(tags) {
        this.setState({
            display: this.state.display,
            positions_tags: this.state.positions_tags,
            locations_tags: this.state.locations_tags,
            tech_stack_tags: this.state.tech_stack_tags,
            pros_tags: tags,
            cons_tags: this.state.cons_tags,
            links_tags: this.state.links_tags,
        });
    }
    changeConsTags(tags) {
        this.setState({
            display: this.state.display,
            positions_tags: this.state.positions_tags,
            locations_tags: this.state.locations_tags,
            tech_stack_tags: this.state.tech_stack_tags,
            pros_tags: this.state.pros_tags,
            cons_tags: tags,
            links_tags: this.state.links_tags,
        });
    }
    changeLinksTags(tags) {
        this.setState({
            display: this.state.display,
            positions_tags: this.state.positions_tags,
            locations_tags: this.state.locations_tags,
            tech_stack_tags: this.state.tech_stack_tags,
            pros_tags: this.state.pros_tags,
            cons_tags: this.state.cons_tags,
            links_tags: tags,
        });
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
                                <ControlLabel>Positions</ControlLabel>
                                <TagsInput value={this.state.positions_tags ? this.state.positions_tags : []} onChange={this.changePositionsTags.bind(this) }/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Locations</ControlLabel>
                                <TagsInput value={this.state.locations_tags ? this.state.locations_tags : []} onChange={this.changeLocationsTags.bind(this) }/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Tech Stack</ControlLabel>
                                <TagsInput value={this.state.tech_stack_tags ? this.state.tech_stack_tags : []} onChange={this.changeTechStackTags.bind(this) }/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Pros</ControlLabel>
                                <TagsInput value={this.state.pros_tags ? this.state.pros_tags : []} onChange={this.changeProsTags.bind(this) }/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Cons</ControlLabel>
                                <TagsInput value={this.state.cons_tags ? this.state.cons_tags : []} onChange={this.changeConsTags.bind(this) }/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Links</ControlLabel>
                                <TagsInput value={this.state.links_tags ? this.state.links_tags : []} onChange={this.changeLinksTags.bind(this) }/>
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
                            onClick={this.handleSubmit.bind(this) }>
                            Save
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