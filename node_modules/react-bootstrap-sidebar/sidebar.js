import {Modal} from 'react-bootstrap';
import React, {Component} from 'react';

import "./style.css";

export default class Sidebar extends Component {
    render() {
        return (
            <Modal className='menu-sidebar left' show={this.props.isVisible} onHide={this.props.onHide} autoFocus keyboard>
                <Modal.Header closeButton>
                    <Modal.Title>Menu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.children}
                </Modal.Body>
            </Modal>
        );
    }
}
