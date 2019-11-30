import React from 'react';
import { StorageService } from './StorageService';
import RoomsList from './rooms/RoomList';
import Header from './Header';

export default class MainForm extends React.Component {
  constructor(props) {
    super(props);
    this.localStorageService = new StorageService();
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
