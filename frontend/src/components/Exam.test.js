/* eslint-disable no-unused-expressions */

import React from 'react';
import Exam from './Exam';
import 'react-testing-library/cleanup-after-each'
import { exams } from '../testData';
import { render, waitForElement, wait, fireEvent } from 'react-testing-library'
import { API_BASE_PATH } from '../config';

const exam = exams[0];
const exam2 = exams[1];

beforeEach(() => {
  fetch.resetMocks()
});

describe("Exam", () => {
  let component;
  let loadExams;

  const expandCard = async () => {
    const expandButton = await component.findByTestId('expand');
    fireEvent.click(expandButton);
  }

  describe("with study groups", () => {

    beforeEach(() => {
      loadExams = jest.fn();
      component = render(<Exam exam={exam} loadExams={loadExams} />);
    });

    it('Shows the header with title', async () => {
      const title = await component.findByTestId('title');
      expect(title).not.to.be.null;
      expect(title.textContent).to.equal(exam.title);
    });

    it('Shows the header with subheader', async () => {
      const title = await component.findByTestId('subheader');
      expect(title).not.to.be.null;
      expect(title.textContent).to.equal(exam.datetime);
    });

    it('Shows study groups once expanded', async () => {
      await expandCard()

      const studyGroups = await component.findAllByTestId(/studyGroup-.*/);
      expect(studyGroups).to.have.length(2);
    });

    it('Add new study group', async () => {
      // mock expected rest calls
      fetch.mockResponseOnce(JSON.stringify({}));

      const testStudyGroup = {
        location: 'new location',
        datetime: 'new datetime'
      }

      // do the rendering 
      await expandCard()

      // change the input fields
      const location = component.getByPlaceholderText('Location');
      fireEvent.change(location, { target: { value: testStudyGroup.location } });

      const datetime = component.getByPlaceholderText('Date / Time');
      fireEvent.change(datetime, { target: { value: testStudyGroup.datetime } });
      
      // fire an event
      const addButton = component.getByTestId('button-add');
      fireEvent.click(addButton);

      // we can also wait for some changes to happen in the UI
      await wait(() => {
        expect(location.value).to.equal('');
        expect(datetime.value).to.equal('');
      });
      
      // validate what happened on the event
      expect(fetch.mock.calls).to.have.length(1);
      const [calledUrl, params] = fetch.mock.calls[0];
      expect(calledUrl).to.equal(`${API_BASE_PATH}/api/exams/1/studyGroups`)
      expect(JSON.parse(params.body)).to.eql(testStudyGroup);
      expect(params.method).to.equal('PUT');

      expect(loadExams.mock.calls).to.have.length(1);
    });
  });

  describe("without study groups", () => {
    beforeEach(() => {
      component = render(<Exam exam={exam2} />);
    });

    it('Shows no study groups', async () => {
      await expandCard();
      const studyGroups = await component.queryAllByTestId(/studyGroup-.*/);
      expect(studyGroups).to.have.length(0);
    });
  });

});

