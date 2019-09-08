import React, { PureComponent } from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import utils from '../../utils/Utils';
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

  render() {
    return (
      <Router>
        <div>
          <h2>Lista dostępnych pokoi</h2>
          <ul>
            {
              this.state.rooms.map(item =>
                (
                  <li key={item.id}>
                    <Link to={`/room/${item.name}`}>
                      {item.name}
                    </Link>
                  </li>
                ))
            }
          </ul>
        </div>
        <Route
          path="/room/:name"
          component={Room}
        />
      </Router>
    );
  }
}
