import React, { PureComponent } from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { utils } from '../../utils/Utils';
import Room from './Room';
import { SocketContext } from '../SocketContext';

export default class RoomsList extends PureComponent {
  static contextType = SocketContext;

  constructor() {
    super();
    this.state = {
      rooms: []
    };
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
    console.log('addings');
    const payload = data;

    payload.userName = localStorage.getItem('username');
    this.context.emit(utils.roomEnter, payload);
  }

  render() {
    return (
      <Router>
        <div>
          <h2>Lista dostępnych pokoi</h2>
          <ul>
            {
              this.state.rooms.map(item =>
                (
                  <li key={item._id}>
                    <Link to={`/room/${item._name}/${item._id}`} onClick={() => this.addUser(item)}>
                      {item._name}
                      =
                    </Link>
                    <div>
                      <b>
                        {item._id}
                      </b>
                    </div>
                    <div>{item._usersIds.length}</div>
                  </li>
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
