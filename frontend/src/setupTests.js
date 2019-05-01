import { expect } from 'chai';

// configure({ adapter: new Adapter() });

global.jestExpect = global.expect;
global.expect = expect;
global.localStorage = localStorage;

global.fetch = require('jest-fetch-mock')