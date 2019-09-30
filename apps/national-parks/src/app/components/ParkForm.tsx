import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { IPark } from '@national-parks/api-interfaces';

type ParkFormProps = {
  park: IPark;
  show: boolean;
  onClose: (status: boolean) => void;
};

export class ParkForm extends React.Component<ParkFormProps, any> {
  /**
   * Creates an instance of ParkList.
   *
   * @param {ParkFormProps} props
   */
  constructor(props) {
    super(props);

    this.state = {
      formControls: {
        type: this.props.park.type,
        name: this.props.park.name,
        location: this.props.park.location
      }
    };
    this.submit = this.submit.bind(this);
    this.updateFormState = this.updateFormState.bind(this);
  }


  /**
   * When any form control's value changes it triggers the
   * `onChange` event which in turn runs this method.
   *
   * @param {*} e
   */
  public updateFormState(e): void {
    e.preventDefault();
    this.setState({
      formControls: {
        ...this.state.formControls,
        [e.target.name]: e.target.value
      }
    });
  };

  /**
   * When the form event `onSubmit` fires, it executes this
   * method to update the park in question.
   *
   * @param {*} e
   */
  public submit(e): void {
    e.preventDefault();
    axios.put(`/api/park/${this.props.park.id}`, this.state.formControls)
      .then(() => {
        this.close(true);
      })
  };

  /**
   * Handles closing the modal sending along a status to inform parent
   * components to refresh data.
   *
   */
  public close = (status: boolean): void => {
    this.props.onClose(status);
  };

  /**
   * Renders the component view.
   *
   * @returns
   */
  public render() {
    return (
      <Modal show={this.props.show}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {this.props.park.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={this.submit}>
            <Form.Group controlId="name">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={this.state.formControls.name}
                onChange={this.updateFormState}
              />
            </Form.Group>
            <Form.Group controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter type"
                name="type"
                value={this.state.formControls.type}
                onChange={this.updateFormState}
              />
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                name="location"
                value={this.state.formControls.location}
                onChange={this.updateFormState}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ParkForm;
