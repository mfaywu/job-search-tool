import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css' 

import { Tasks } from '../../api/tasks.js';

export default class AddTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display: false,
        };
    }

    close() {
        this.setState({ display: false});
    }

    open() {
        this.setState({ display: true});
    }

    handleSubmit(event) {
        event.preventDefault();

        const textInput = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        const dateInput = ReactDOM.findDOMNode(this.refs.dateInput).value.trim();
        const companyInput = ReactDOM.findDOMNode(this.refs.companyInput).value.trim();

        Meteor.call('tasks.insert', textInput, dateInput, companyInput);

        this.close();
    }
    changeTags(tags) {
        this.setState( {display: this.state.display});
    }

    render() {
        return (
            <div>
                <Modal show={this.state.display} onHide={this.close.bind(this) }>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a new task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup>
                                <ControlLabel>Action</ControlLabel>
                                <FormControl ref="textInput" type="text" placeholder="Ex: Email Sally" />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Do by</ControlLabel>
                                <input ref="dateInput" type="date" placeholder="" />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Company</ControlLabel>
                                <FormControl ref="companyInput" type="text" placeholder="Ex: Microsoft" />
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="info"
                            type="submit"
                            onClick={this.handleSubmit.bind(this) }>
                            Add Task
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