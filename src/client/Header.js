import React, { Component } from 'react';

class Header extends Component {
  state = {}

  render() {
    return (
      <div>
        <h2>Hello world</h2>
        <a href="http://localhost:8080/auth/facebook">Authorize now with Facebook</a>

      </div>
    );
  }
}

export default Header;
