import React from 'react';
import PropTypes from 'prop-types';
import utils from '../../utils/Utils';
import { SocketContext } from '../SocketContext';


export default class Room extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  }

  static contextType = SocketContext;

  constructor(props) {
    super(props);
    this.params = this.props.match.params;
    this.state = ({
      room: ''
    });
  }


  componentDidMount() {
    this.context.emit(utils.roomEnter, { user: localStorage.getItem('username'), id: this.params.id });
    console.log('reloading');
 }

  componentWillReceiveProps(newProps) {
    this.setState({
      room: newProps.match.params.name
    });
  }

  render() {
    return (
      <div>
        Hello in new Room:
        {this.state.room}
      </div>
    );
  }
}
