import React from 'react';
import PropTypes from 'prop-types';
import { SocketContext } from '../../SocketContext';
import { utils } from '../../../utils/Utils';

export default class Room extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    rooms: PropTypes.array.isRequired
  }

  static contextType = SocketContext;

  constructor(props) {
    super(props);
    this.params = this.props.match.params;

    window.addEventListener('beforeunload', (ev) => {
      ev.preventDefault();
      this.handleLeaveRoom();
    });
  }

  handleLeaveRoom = () => {
    this.context.emit(utils.roomLeave, JSON.parse(localStorage.getItem('user')));
  }

  componentWillUnmount = () => {
    this.handleLeaveRoom();
  }


  render() {
    const { rooms } = this.props;
    const { id } = this.props.match.params;
    return (
      <>
        <div>
          Hello in new Room:
          {this.props.match.params.name}
        </div>
        <ul className="users-list">
          {rooms[id]
            && rooms[id]._usersIds.map(user => (
              <li key={user._id} className="users-list-item">
                {user._name}
              </li>
            ))}
        </ul>

        <div>
          <button type="button" onClick={this.handleLeaveRoom}>
            Opuść pokój
          </button>
        </div>
      </>
    );
  }
}
