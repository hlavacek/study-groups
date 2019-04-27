import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';

configure({ adapter: new Adapter() });

global.jestExpect = global.expect;
global.expect = expect;
global.localStorage = localStorage;
