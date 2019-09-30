import React from 'react';
import axios from 'axios';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import { ParkForm } from './ParkForm';
import { IPark } from '@national-parks/api-interfaces';

type ParkListButtonsProps = {
  park: IPark;
  update: (status: boolean) => void;
};

type ParkListButtonState = {
  showModal: boolean;
};

export class ParkListButtons extends React.Component<ParkListButtonsProps, ParkListButtonState> {
  /**
   * Creates an instance of ParkList.
   *
   * @param {ParkListButtonsProps} props
   */
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.edit = this.edit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.delete = this.delete.bind(this);
  }

  /**
   * Handles opening the form modal on click of the edit button.
   *
   * @param {*} e
   */
  public edit(e): void {
    this.setState({
      showModal: true
    });
  };

  /**
   * Handles the close/hide event of the modal. If a request was successful,
   * it calls update on the park list to refresh the list.
   *
   * @param {boolean} status
   */
  public onClose(status: boolean): void {
    if (status === true) {
      this.props.update(status);
    }
    this.setState({
      showModal: false
    });
  }

  /**
   * Handles deleting a park.
   *
   * @param {*} e
   */
  public delete(e): void {
    e.preventDefault();
    axios
      .delete(`/api/park/${this.props.park.id}`)
      .then(() => {
        this.onClose(true);
      });
  }

  /**
   * Renders the component view.
   *
   * @returns
   */
  public render() {
    return (
      <span>
        <ButtonGroup>
          <Button variant="primary" onClick={this.edit}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button variant="danger" onClick={this.delete}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </ButtonGroup>
        <ParkForm park={this.props.park} show={this.state.showModal} onClose={this.onClose} />
      </span>
    );
  }
}

export default ParkListButtons;
