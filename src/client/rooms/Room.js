import React from 'react';
import PropTypes from 'prop-types';

export default class Room extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  }

  componentDidMount() {
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
