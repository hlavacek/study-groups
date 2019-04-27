
exports.config = {
  /*
    Having the sauce user forces to use sauce labs, otherwise use local selenium driver
  */
  seleniumAddress: process.env.SELENIUM_ADDRESS || 'http://127.0.0.1:4444/wd/hub',
  getPageTimeout: 60000,
  allScriptsTimeout: 500000,
  framework: 'custom',
  // path relative to the current config file
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  capabilities: {
    browserName: 'chrome'
  },

  // Spec patterns are relative to this directory.
  specs: [
    'features/*.feature'
  ],

  cucumberOpts: {
    require: ['features/**/*.js'],
    tags: process.env.TAGS || false,
    strict: true,
    format: ['node_modules/cucumber-pretty', 'json:test/report/cucumber_report.json'],
    profile: false,
    'no-source': true
  }
};
