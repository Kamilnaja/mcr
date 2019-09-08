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
      isFormVisible: !localStorage.getItem('username')
    };
  }

  handleRoomEnter = () => { }

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
      </>
    );
  }
}
