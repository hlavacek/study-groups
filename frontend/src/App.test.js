import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('Shows the header', () => {
  const app = shallow(<App />);
  const header = app.find('header');
  expect(header).to.have.length(1);
  expect(header.text()).to.equal("Study Groups");
});
