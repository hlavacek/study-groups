/* eslint-disable no-unused-expressions */

import React from 'react';
import StudyGroup from './StudyGroup';
import { exams } from '../testData';
import 'react-testing-library/cleanup-after-each'
import {render, fireEvent, wait} from 'react-testing-library'
import { API_BASE_PATH } from '../config';

const studyGroup1 = exams[0].studyGroups[0];
const studyGroup2 = exams[0].studyGroups[1];

beforeEach(() => {
  fetch.resetMocks()
});

describe("StudyGroup", () => {
  let component;
  let loadExams;

  describe("with students", () => {
    beforeEach(() => {
      loadExams = jest.fn();
      component = render(<StudyGroup studyGroup={studyGroup1} exam={{id: 1}} loadExams={loadExams}/>);
    });
  
    it('Shows the header with location', () => {
      const location = component.queryByTestId('location');
      expect(location).not.to.be.null;
      expect(location.textContent).to.equal(studyGroup1.location);
    });
    
    it('Shows the header with datetime', () => {
      const datetime = component.queryByTestId('datetime');
      expect(datetime).not.to.be.null;
      expect(datetime.textContent).to.equal(studyGroup1.datetime);
    });
  
    it('Shows chips for participants', () => {
      const chips = component.queryAllByTestId('student');
      expect(chips).to.have.length(studyGroup1.students.length);
    });

    it('should add a new student', async () => {
      // mock expected rest calls
      fetch.mockResponseOnce(JSON.stringify({}));

      const testStudent = {
        name: 'student name',
      }

      // change the input fields
      const student = component.getByPlaceholderText('Student Name');
      fireEvent.change(student, { target: { value: testStudent.name } });

      fireEvent.keyDown(student, { key: 'Enter' })
    
      await wait(() => {
        expect(student.value).to.equal('');
      });

      // validate what happened on the event
      expect(fetch.mock.calls).to.have.length(1);
      const [calledUrl, params] = fetch.mock.calls[0];
      expect(calledUrl).to.equal(`${API_BASE_PATH}/api/exams/1/studyGroups/1/students`)
      expect(JSON.parse(params.body)).to.eql(testStudent);
      expect(params.method).to.equal('PUT');
    });
  });

  describe('without students', () => {
    beforeEach(() => {
      component = render(<StudyGroup studyGroup={studyGroup2} />);
    });

    it('Shows no chips', () => {
      const chips = component.queryAllByTestId('student');
      expect(chips).to.have.length(0);
    });
  });
  
});

