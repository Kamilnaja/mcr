import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { SocketContext } from './SocketContext';
import './app.css';
import MainForm from './MainForm';
import RoomsList from './rooms/RoomList';

export default class App extends Component {

  componentDidMount() { }

  render() {
    const { Provider } = SocketContext;

    return (
      <Provider value={socketIOClient('http://localhost:8080')}>
        <MainForm />
        <RoomsList />
      </Provider>
    );
  }
}
