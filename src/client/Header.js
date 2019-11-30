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
    };
  }

  logout = () => {
    this.setState = {
      isAuthenticated: false,
      token: '',
      user: null
    };
  };

  facebookResponse = response => {
    console.log(response);
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
    fetch('http://localhost:8080/api/v1/auth/facebook', options).then((res) => {
      const token = res.headers.get('x-auth-token');
      res.json().then(user => {
        if (token) {
          this.setState({
            isAuthenticated: true,
            user,
            token
          });
        }
      });
    });
  };

  render() {
    const content = this.state.isAuthenticated ? (
      <div>
        <p>Authenticated</p>
        <div>{this.state.user.email}</div>
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
