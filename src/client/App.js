/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import './app.css';
import MainForm from './MainForm';
import RoomsList from './RoomsList';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomsList: ['uno', 'dos', 'tres']
    };
  }

  render() {
    return (
      <div>
        <MainForm />
        <RoomsList rooms={this.state.roomsList} />
      </div>
    );
  }
}
