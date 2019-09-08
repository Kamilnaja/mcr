import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import utils from '../../utils/Utils';
import Room from './Room';

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
