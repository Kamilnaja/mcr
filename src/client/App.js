/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import './app.css';
import socketIOClient from 'socket.io-client';
import MainForm from './MainForm';
import RoomsList from './rooms/RoomList';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.socket = socketIOClient('http://localhost:8080');
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <MainForm socket={this.socket} />
        <RoomsList socket={this.socket} />
      </div>
    );
  }
}
