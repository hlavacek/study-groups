import React from 'react';
import { mount } from 'enzyme';
import StudyGroup from './StudyGroup';
import { exams } from '../testData';

const studyGroup1 = exams[0].studyGroups[0];
const studyGroup2 = exams[0].studyGroups[1];

describe("StudyGroup", () => {
  let component;

  describe("with students", () => {
    beforeEach(() => {
      component = mount(<StudyGroup studyGroup={studyGroup1} />);
    });
  
    it('Shows the header with title', () => {
      const header = component.find('header');
      expect(header).to.have.length(1);
      const title = header.find('Typography[variant="body1"]');
      expect(title).to.have.length(1);
      expect(title.text()).to.equal(studyGroup1.location);
    });
  
    it('Shows chips for participants', () => {
      const chips = component.find('Chip');
      expect(chips).to.have.length(studyGroup1.students.length);
    });
  });

  describe('without students', () => {
    beforeEach(() => {
      component = mount(<StudyGroup studyGroup={studyGroup2} />);
    });

    it('Shows no chips', () => {
      const chips = component.find('Chip');
      expect(chips).to.have.length(0);
    });
  });
  
});

