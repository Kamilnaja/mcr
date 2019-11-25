/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
      user: null,
      token: ''
    }
  }

  facebookResponse = (e) => {

  }

  render() {
    const content = this.state.isAuthenticated ? (
      <div>
        <p>Authenticated</p>
        <div>
          {this.state.user.email}
        </div>
      </div>
    ) : (
        <FacebookLogin
          appId="281270675842379"
          autoLoad={false}
          fields="name,email,picture"
          callback={this.facebookResponse}
        />
      );

    return (
      <div>
        {content}
        <h2>Hello world</h2>


      </div>
    );
  }
}

export default Header;
