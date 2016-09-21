import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css' 

import { Questions } from '../../api/questions.js';

export default class AddQuestion extends Component {
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

        const questionInput = ReactDOM.findDOMNode(this.refs.questionInput).value.trim();
        const typeInput = ReactDOM.findDOMNode(this.refs.typeInput).value.trim();
        
        Meteor.call('questions.insert', questionInput, typeInput);

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
                        <Modal.Title>Add a new question</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup>
                                <ControlLabel>Question</ControlLabel>
                                <FormControl ref="questionInput" type="text" placeholder="Ex: What is your greatest accomplishment?" />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Type</ControlLabel>
                                <FormControl ref="typeInput" componentClass="select" placeholder="Select">
                                    <option value="Behavioural">Behavioural</option>
                                    <option value="To Ask">To Ask</option>
                                </FormControl>
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="info"
                            type="submit"
                            onClick={this.handleSubmit.bind(this) }>
                            Add Question
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