import React, { Component } from 'react';
import './app.css';
import PropTypes from 'prop-types';
import { SocketContext } from './SocketContext';
import { utils } from '../utils/Utils';

export default class UserNameForm extends Component {
  static propTypes = {
    toggleFormVisible: PropTypes.func.isRequired,
  }

  static contextType = SocketContext;

  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
  }

  handleChange = (event) => {
    this.setState({
      username: event.target.value
    });
  }

  handleUserSubmit = (event) => {
    event.preventDefault();

    if (this.state.username !== '') {
      localStorage.setItem('username', this.state.username);
      this.context.emit(utils.createdNewUser, this.state.username);
      this.props.toggleFormVisible(false);
    } else {
      console.log('Please enter your username');
    }
  }

  render() {
    return (
      <div>
        <section className="userForm">
          <form onSubmit={this.handleUserSubmit}>
            <label htmlFor="username">
              Please enter your name
              <input type="text" id="username" onChange={this.handleChange} value={this.state.username} />
            </label>
            <button type="submit">Submit</button>
          </form>
        </section>
      </div>
    );
  }
}
