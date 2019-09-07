/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import UserNameForm from './UserNameForm';

export default class MainForm extends React.Component {
  static propTypes = {
    socket: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      room: '',
      isFormVisible: false
    };
  }

  componentDidMount() {

  }

  handleRoomEnter = () => { }

  handleGenerate = () => {
    this.props.socket.emit('createNewRoom', this.state.username);
  }

  toggleFormVisible = (value) => {
    this.setState({
      isFormVisible: value
    });
  }

  broadcastState = () => {

  }

  render() {
    return (
      <>
        {
          this.state.isFormVisible
            ? (
              <UserNameForm
                socket={this.props.socket}
                isSubmitted={this.state.isSubmitted}
                toggleFormVisible={this.toggleFormVisible}
              />
            )
            : (
              <section className="userExistingName">
                <div>
                  <h2>Use existing username</h2>
                  <div>
                    Your existing username is:
                    {localStorage.getItem('username')}
                  </div>
                  <div>
                    <button type="submit" onClick={() => this.toggleFormVisible(true)}>
                      Change
                    </button>
                  </div>
                </div>
              </section>
            )
        }

        <section>
          {
            this.state.isSubmitted
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
      </>
    );
  }
}
