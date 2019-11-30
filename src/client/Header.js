/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { url } from '../utils/Utils';

class Header extends Component {
  constructor() {
    super();
    if (sessionStorage.getItem('user')) {
      this.state = {
        isAuthenticated: true,
        user: sessionStorage.getItem('user')
      };
    } else {
      this.state = {
        isAuthenticated: false,
        user: null
      };
    }
  }

  logout = () => {
    this.setState({
      isAuthenticated: false,
      user: null
    });
    sessionStorage.removeItem('user');
  };

  facebookResponse = response => {
    const tokenBlob = new Blob(
      [
        JSON.stringify(
          {
            access_token: response.accessToken
          },
          null,
          2
        )
      ],
      { type: 'application/json' }
    );
    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default'
    };
    fetch(url.fb, options).then(res => {
      const token = res.headers.get('x-auth-token');
      res.json().then(user => {
        if (token) {
          this.setState({
            isAuthenticated: true,
            user: user.email
          });
          sessionStorage.setItem('user', user.email);
        }
      });
    });
  };

  render() {
    const content = this.state.isAuthenticated ? (
      <div>
        <p>Jesteś zalogowany jako:</p>
        <div>{this.state.user}</div>
        <button type="button" onClick={this.logout}>
          Logout
        </button>
      </div>
    ) : (
      <FacebookLogin
        appId="281270675842379"
        autoLoad={false}
        fields="name,email,picture"
        callback={this.facebookResponse}
      />
    );

    return <div>{content}</div>;
  }
}

export default Header;
