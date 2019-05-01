import React from 'react';
import App from './App';
import { exams } from './testData';
import 'react-testing-library/cleanup-after-each'
import {render, waitForElement} from 'react-testing-library'


beforeEach(() => {
  fetch.resetMocks()
})

it('Shows the exams', async () => {
  fetch.mockResponseOnce(JSON.stringify(exams));

  const {getAllByTestId} = render(<App />);  

  const examComponents = await waitForElement(() => getAllByTestId(/exam-root-.*/));
  expect(examComponents).to.have.length(2);
});
