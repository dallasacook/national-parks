import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';

import { ParkListButtons } from './ParkListButtons';
import { IPark } from '@national-parks/api-interfaces';

type ParkListState = {
  parkList: JSX.Element[];
  pagination: JSX.Element[];
  currentPage: any;
  buttonStatus: any;
};

export class ParkList extends React.Component<any, ParkListState> {
  private parks: IPark[] = [];
  private currentPage: number = 1;
  private pageSize: number = 8;
  private totalPages: number;
  private ellipsisOffset: number = 5;
  private buttonStatus = {
    first: () => this.currentPage === 1,
    prev: () => this.currentPage === 1,
    firstEllipsis: () => this.currentPage - this.pageSize > 1,
    secondEllipsis: () => this.currentPage + this.pageSize < this.totalPages,
    next: () => this.totalPages === this.currentPage,
    last: () => this.totalPages === this.currentPage
  };

  /**
   * Creates an instance of ParkList.
   *
   * @param {ParkListProps} props
   */
  constructor(props) {
    super(props);
    this.totalPages = Math.round((this.parks.length - 1) / this.pageSize);
    this.state = {
      parkList: this.getParkList(),
      pagination: this.getPagination(),
      currentPage: this.currentPage,
      buttonStatus: this.getButtonStatus()
    };
    this.updatePage = this.updatePage.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount(): void {
    this.getParks();
  }

  /**
   * On click of the main pagination item, this method is triggered by
   * the event, sets the currentPage and updates state.
   *
   * This method only works when clicking `Pagination.Item` elements.
   *
   * @author D. Cook
   * @param {*} e
   */
  public updatePage(e) {
    const page = Number(e.target.text);
    if (page >= 0) {
      this.currentPage = page;
      this.setState({
        parkList: this.getParkList(),
        pagination: this.getPagination(),
        currentPage: this.currentPage,
        buttonStatus: this.getButtonStatus()
      });
    }
  }

  /**
   * This method is triggered on click when clicking any `Pagination`
   * element other than `Item` due to the need to pass the page argument.
   *
   * @param {number} page
   */
  public navigateToPage(page: number) {
    this.currentPage = page;
    this.setState({
      parkList: this.getParkList(),
      pagination: this.getPagination(),
      currentPage: this.currentPage,
      buttonStatus: this.getButtonStatus()
    });
  }

  /**
   * Bound prop method to update the parks list on a successful request.
   *
   * @param {*} e
   */
  public update(status: boolean): void {
    if (status) {
      this.getParks();
    }
  }

  /**
   * Renders the component view.
   *
   * @returns
   */
  public render() {
    return (
      <span>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th colSpan={2}>Location</th>
            </tr>
          </thead>
          <tbody>{this.state.parkList}</tbody>
        </Table>
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <Pagination onClick={this.updatePage}>
                <Pagination.First
                  disabled={this.state.buttonStatus.first}
                  onClick={() => {
                    this.navigateToPage(1);
                  }}
                />
                <Pagination.Prev
                  disabled={this.state.buttonStatus.prev}
                  onClick={() => {
                    this.navigateToPage(this.currentPage - 1);
                  }}
                />
                <Pagination.Item active={this.state.currentPage === 1}>
                  {1}
                </Pagination.Item>
                {this.state.buttonStatus.firstEllipsis && (
                  <Pagination.Ellipsis
                    onClick={() => {
                      this.navigateToPage(this.currentPage - this.pageSize);
                    }}
                  />
                )}
                {this.state.pagination}
                {this.state.buttonStatus.secondEllipsis && (
                  <Pagination.Ellipsis
                    onClick={() => {
                      this.navigateToPage(this.currentPage + this.pageSize);
                    }}
                  />
                )}
                <Pagination.Next
                  disabled={this.state.buttonStatus.next}
                  onClick={() => {
                    this.navigateToPage(this.currentPage + 1);
                  }}
                />
                <Pagination.Last
                  disabled={this.state.buttonStatus.last}
                  onClick={() => {
                    this.navigateToPage(this.totalPages);
                  }}
                />
              </Pagination>
            </Col>
          </Row>
        </Container>
      </span>
    );
  }

  /**
   * Get's the park list from the API.
   *
   * @author D. Cook
   * @private
   */
  private getParks(): void {
    axios.get<IPark[]>('/api/park').then(response => {
      this.parks = response.data;
      this.totalPages = Math.round((this.parks.length - 1) / this.pageSize);
      this.setState({
        parkList: this.getParkList(),
        pagination: this.getPagination(),
        currentPage: this.currentPage,
        buttonStatus: this.getButtonStatus()
      });
    });
  }

  /**
   * Gets the main `Pagination.Item` elements.
   *
   * @private
   * @returns {JSX.Element[]}
   */
  private getPagination(): JSX.Element[] {
    let pagination = [];
    for (let i = 1; i <= this.totalPages; i++) {
      if (
        i > 1 &&
        i < this.totalPages + 1 &&
        i < this.currentPage + this.ellipsisOffset &&
        i > this.currentPage - this.ellipsisOffset
      ) {
        pagination.push(
          <Pagination.Item
            key={this.parks[i].id}
            active={i === this.currentPage}
          >
            {i}
          </Pagination.Item>
        );
      }
    }
    return pagination;
  }

  /**
   * Gets the list of table elements determined by pagination properties.
   *
   * @private
   * @returns {JSX.Element[]}
   */
  private getParkList(): JSX.Element[] {
    return this.parks.reduce((acc: JSX.Element[], park, index) => {
      if (
        index >= this.currentPage * this.pageSize - this.pageSize &&
        index < this.currentPage * this.pageSize
      ) {
        acc.push(
          <tr key={park.id} style={{ textAlign: 'center' }}>
            <td>{park.name}</td>
            <td>
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id={`tooltip-${park.id}`}>
                    {park.park_type.description}
                  </Tooltip>
                }
              >
                <Button variant="secondary">{park.type}</Button>
              </OverlayTrigger>
            </td>
            <td>{park.location}</td>
            <td>
              <ParkListButtons park={park} update={this.update} />
            </td>
          </tr>
        );
      }
      return acc;
    }, []);
  }

  /**
   * Helper method to get button status of pagination buttons other than `Pagination.Item`.
   *
   * @author D. Cook
   * @private
   * @returns
   */
  private getButtonStatus() {
    return {
      first: this.buttonStatus.first(),
      prev: this.buttonStatus.prev(),
      firstEllipsis: this.buttonStatus.firstEllipsis(),
      secondEllipsis: this.buttonStatus.secondEllipsis(),
      next: this.buttonStatus.next(),
      last: this.buttonStatus.last()
    };
  }
}

export default ParkList;
