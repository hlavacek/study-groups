import React from 'react';
import { mount } from 'enzyme';
import App from './App';


it('Shows the exams', () => {
  const app = mount(<App />);
  const header = app.find('Exam');
  expect(header).to.have.length(2);
});


// it('Shows the header row with titles', () => {
//   const app = shallow(<App />);
//   const tableHeaders = app.find('th');
//   expect(tableHeaders).to.have.length(3);
//   expect(tableHeaders.map(header => header.text()))
//     .to.eql(['Course', 'Date', 'Time']);
// });

// it('Shows the header row with titles', () => {
//   const app = shallow(<App />);
//   const tableHeaders = app.find('th');
//   expect(tableHeaders).to.have.length(3);
//   expect(tableHeaders.map(header => header.text()))
//     .to.eql(['Course', 'Date', 'Time']);
// });