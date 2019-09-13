import React from 'react';
import PropTypes from 'prop-types';
import { utils } from '../../utils/Utils';
import { SocketContext } from '../SocketContext';

export default class Room extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  }

  static contextType = SocketContext;

  constructor(props) {
    super(props);
    this.params = this.props.match.params;
  }

  render() {
    return (
      <div>
        Hello in new Room:
        {this.props.match.params.name}
      </div>
    );
  }
}
