import React from 'react';
import UserNameForm from './UserNameForm';
import { LocalStorageService } from './LocalStorageService';

export default class MainForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFormVisible: !localStorage.getItem('user')
    };
    this.localStorageService = new LocalStorageService();
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
                isSubmitted={this.state.isSubmitted}
                toggleFormVisible={this.toggleFormVisible}
              />
            )
            : (
              <section className="userExistingName">
                <div>
                  <h2>Use existing username</h2>
                  <div>
                    Your current username is:
                    {this.localStorageService.name}
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
