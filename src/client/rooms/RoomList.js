import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { utils } from '../../utils/Utils';
import Room from './Room/Room';
import { SocketContext } from '../SocketContext';
import RoomListItem from './RoomListItem';
import { LocalStorageService } from '../LocalStorageService';

export default class RoomsList extends PureComponent {
  static contextType = SocketContext;

  constructor() {
    super();
    this.state = {
      rooms: []
    };
    this.localStorageService = new LocalStorageService();
  }

  componentDidMount() {
    this.context.emit(utils.getRooms);
    this.context.on(utils.getRooms, (data) => {
      this.setState({
        rooms: data.roomList
      });
    });
  }

  addUser = (data) => {
    const payload = {};
    payload.room = {
      id: data._id,
      name: data._name
    };
    payload.user = this.localStorageService.user;
    this.context.emit(utils.roomEnter, payload);
  }

  render() {
    return (
      <Router>
        <div>
          <h2>Lista dostępnych pokoi</h2>
          <ul className="room-items-list">
            {
              this.state.rooms.map(item => (
                <RoomListItem
                  item={item}
                  key={item._id}
                  addUser={this.addUser}
                />
              ))
            }
          </ul>
        </div>
        <Route
          path="/room/:name/:id"
          component={Room}
        />
      </Router>
    );
  }
}
