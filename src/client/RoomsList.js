/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import utils from '../utils/Utils';

export default class RoomsList extends PureComponent {
  static propTypes = {
    socket: PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      rooms: []
    };
  }

  componentDidMount() {
    this.props.socket.emit(utils.getRooms);
    this.props.socket.on(utils.getRooms, (data) => {
      console.log('start');

      this.setState({
        rooms: data.rooms
      });
    });
  }

  render() {
    return (
      <div>
        <h2>Lista dostępnych pokoi</h2>
        <ul>
          {
            this.state.rooms.map(item =>
              (
                <li key={item}>
                  <a href={item}>{item}</a>
                </li>
              ))
          }
        </ul>
      </div>
    );
  }
}
