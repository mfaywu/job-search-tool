import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';

import { Jobs } from '../api/jobs.js';

// Job component - represents a single job
export default class AddJob extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display: true,
        };
    }

    showAddJob() {
        this.state.display = !this.state.display;
    }

    close() {
        this.setState( {display: false });
    }

    open() {
        this.setState( {display: true});
    }

    handleSubmit(event) {
        event.preventDefault();

        const company = ReactDOM.findDOMNode(this.refs.companyInput).value.trim();
        const position = ReactDOM.findDOMNode(this.refs.positionInput).value.trim();
        const location = ReactDOM.findDOMNode(this.refs.locationInput).value.trim();
        const state = ReactDOM.findDOMNode(this.refs.stateInput).value.trim();

        Jobs.insert({
            company,
            position,
            location,
            state,
            createdAt: new Date(),
        });

        ReactDOM.findDOMNode(this.refs.companyInput).value = '';
        ReactDOM.findDOMNode(this.refs.positionInput).value = '';
        ReactDOM.findDOMNode(this.refs.locationInput).value = '';
        ReactDOM.findDOMNode(this.refs.stateInput).value = '';
    }

    render() {
        return (
            <div>
                <Modal show={this.state.display} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Text in a modal</h4>
                        <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

                        <h4>Popover in a modal</h4>

                        <h4>Overflowing text to show scroll behavior</h4>
                        <p>Cras mattis consectetur purus sit amet fermentum.Cras justo odio, dapibus ac facilisis in, egestas eget quam.Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close.bind(this)}>Close</Button>
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

AddJob.propTypes = {
}