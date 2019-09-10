import React from 'react';
import UserNameForm from './UserNameForm';

export default class MainForm extends React.Component {

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
