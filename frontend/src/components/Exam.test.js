import React from 'react';
import { mount } from 'enzyme';
import Exam from './Exam';
import { exams } from '../testData';

const exam = exams[0];
const exam2 = exams[1];

describe("Exam", () => {
  let component;

  const expandCard = () => {
    const moreButton = component.find('IconButton[className~="button"][aria-label="Show more"]');
    expect(moreButton).to.have.length(1);
    moreButton.simulate('click');
  }

  describe("with study groups", () => {
    beforeEach(() => {
      component = mount(<Exam exam={exam} />);
    });

    it('Shows the header with title', () => {
      const header = component.find('CardHeader');
      expect(header).to.have.length(1);
      expect(header.prop('title')).to.equal("Artificial Intelligence");
    });

    it('Shows study groups once expanded', () => {
      expandCard();
      const studyGroup = component.find('StudyGroup');
      expect(studyGroup).to.have.length(2);
    });
  });

  describe("without study groups", () => {
    beforeEach(() => {
      component = mount(<Exam exam={exam2} />);
    });

    it('Shows no study groups', () => {
      expandCard();
      const header = component.find('StudyGroup');
      expect(header).to.have.length(0);
    });
  });

});

