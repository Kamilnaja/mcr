/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import UserNameForm from './UserNameForm';
import RoomForm from './rooms/RoomForm';

export default class MainForm extends React.Component {
  static propTypes = {
    socket: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      room: '',
      isFormVisible: !localStorage.getItem('username')
    };
  }

  handleRoomEnter = () => { }

  generateNewRoom = () => {
    this.props.socket.emit('createNewRoom', this.state.username);
  }

  toggleFormVisible = (value) => {
    this.setState({
      isFormVisible: value
    });
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
                <hr />
              </section>
            )
        }
        <RoomForm socket={this.props.socket} />
      </>
    );
  }
}
