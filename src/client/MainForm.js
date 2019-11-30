import React from 'react';
import { LocalStorageService } from './LocalStorageService';
import RoomsList from './rooms/RoomList';
import Header from './Header';

export default class MainForm extends React.Component {
  constructor(props) {
    super(props);
    this.localStorageService = new LocalStorageService();
  }

  render() {
    return (
      <>
        <Header />
        <RoomsList />
      </>
    );
  }
}
