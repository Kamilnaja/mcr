import React from 'react';
import socketIOClient from 'socket.io-client';

export default class MainForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isSubmitted: false,
      room: ''
    };
    this.socket = socketIOClient('http://localhost:80');
  }

  handleUserSubmit = (event) => {
    event.preventDefault();

    if (this.state.username !== '') {
      this.setState({
        isSubmitted: true
      });
      this.socket.emit('createdNewUser', this.state.username);
    } else {
      console.log('Please enter your username');
    }
    console.log(this.state.username);
  }

  handleChange = (event) => {
    this.setState({
      username: event.target.value
    });
  }

  handleGenerate = () => {
    this.socket.emit('createNewRoom', this.state.username);
  }

  handleRoomEnter = () =>  { }

  render() {
    return (
      <section>
        <h1>{this.state.username}</h1>
        <form onSubmit={this.handleUserSubmit}>
          <label htmlFor="username">
            Please enter your name
            <input type="text" id="username" onChange={this.handleChange} value={this.state.username} />
          </label>
          <button type="submit">Submit</button>
        </form>

        {this.state.isSubmitted
          ? (
            <div>
              <h1>
                Username:
                {this.state.username}
              </h1>
              <div>
                <button onClick={this.handleGenerate} type="button">Create new room</button>
              </div>
              <div>
                So, you can connect into:
                <a href={this.state.room} onClick={() => this.handleRoomEnter}>{this.state.room}</a>
              </div>
            </div>
          )
          : ''}
      </section>
    );
  }
}
