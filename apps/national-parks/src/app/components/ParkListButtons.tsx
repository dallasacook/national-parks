import React from 'react';
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
  }

  public edit = (e): void => {
    this.setState({
      showModal: true
    });
  };

  public onClose = (status: boolean): void => {
    if (status === true) {
      this.props.update(status);
    }
    this.setState({
      showModal: false
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
          <Button variant="danger">
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </ButtonGroup>
        <ParkForm park={this.props.park} show={this.state.showModal} onClose={this.onClose} />
      </span>
    );
  }
}

export default ParkListButtons;
