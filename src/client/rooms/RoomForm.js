/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import utils from '../../utils/Utils';

export default class RoomForm extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    socket: PropTypes.any.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      roomName: ''
    };
  }

  handleChange = (event) => {
    this.setState({
      roomName: event.target.value
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    if (this.state.roomName !== '') {
      this.props.socket.emit('createNewRoom', this.state.roomName);
    } else {
      console.log('Please enter your roomname');
    }
  }

  render() {
    return (
      <div>
        <section className="userForm">
          <form onSubmit={this.handleFormSubmit}>
            <label htmlFor="roomName">
              Please enter room name
              <input type="text" id="roomName" onChange={this.handleChange} value={this.state.roomName} />
            </label>
            <button type="submit">Submit</button>
          </form>
        </section>
      </div>
    );
  }
}
