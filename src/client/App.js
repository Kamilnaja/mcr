/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import './app.css';
import socketIOClient from 'socket.io-client';
import MainForm from './MainForm';
import RoomsList from './RoomsList';
import utils from '../utils/Utils';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.socket = socketIOClient('http://localhost:8080');
    this.state = {
      isAlertVisible: false
    };

    this.socket.on('alert', (data) => {
      console.log(`someting włong ${data}`);
      this.setState({
        isAlertVisible: true,
      });
    });
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <MainForm socket={this.socket} />
        <RoomsList socket={this.socket} />
        {this.state.isAlertVisible ? <div>Duplicate name</div> : ''}
      </div>
    );
  }
}
