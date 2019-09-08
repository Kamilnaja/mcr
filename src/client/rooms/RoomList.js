import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import utils from '../../utils/Utils';

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
      this.setState({
        rooms: data.roomList
      });
      console.log(this.state.rooms.roomList);
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
                <li key={item.id}>
                  <a href={item}>{item.name}</a>
                </li>
              ))
          }
        </ul>
      </div>
    );
  }
}
