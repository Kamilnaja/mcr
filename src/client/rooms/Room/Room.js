import React from 'react';
import PropTypes from 'prop-types';
import { SocketContext } from '../../SocketContext';
import { RoomService } from './RoomService';
import { utils } from '../../../utils/Utils';

export default class Room extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  }

  static contextType = SocketContext;

  constructor(props) {
    super(props);
    this.params = this.props.match.params;
    this.service = new RoomService();
  }

  handleLeaveRoom = () => {
    const payload = {};
    payload.userName = localStorage.getItem('username');
    this.context.emit(utils.roomLeave, payload);
  }

  render() {
    return (
      <div>
        Hello in new Room:
        {this.props.match.params.name}
        <div>
          <button type="button" onClick={this.handleLeaveRoom}>
            Opuść pokój
          </button>
        </div>
      </div>
    );
  }
}
