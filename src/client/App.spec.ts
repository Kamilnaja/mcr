// src/tests/App.test.js
import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import App from './App'; // component, that we need test

describe('<App test.', () => {
  it('have a Main element inside', () => {
    const wrapper = shallow(<App />)
  });
});
