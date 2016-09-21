import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

import { UserQuestions } from '../../api/userQuestions.js';

export default class EditUserQuestion extends Component {
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

        const answerInput = ReactDOM.findDOMNode(this.refs.answerInput).value.trim();

        Meteor.call('userQuestions.update', this.props.userQuestion._id, answerInput);

        this.close();
    }
    changeTags(tags) {
        this.setState({ display: this.state.display});
    }

    render() {
        return (
            <div>
                <Modal show={this.state.display} onHide={this.close.bind(this) }>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Answer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup>
                                <ControlLabel>Answer</ControlLabel>
                                <FormControl ref="answerInput" type="text" placeholder={this.props.userQuestion.answer}/>
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

EditUserQuestion.propTypes = {
    userQuestion: PropTypes.object.isRequired,
};