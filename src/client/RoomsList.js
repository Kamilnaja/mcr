import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class RoomsList extends PureComponent {
  static propTypes = {
    rooms: PropTypes.arrayOf(PropTypes.string)
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <ul>
          {
            this.props.rooms.map(item => <li key={item}>{item}</li>)
          }
        </ul>
      </div>
    );
  }
}


RoomsList.defaultProps = {
  rooms: []
};
