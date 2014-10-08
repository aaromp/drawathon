exports.config = {
  
  allScriptsTimeout: 99999,

  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'safari'
  },

  baseUrl: 'http://localhost:8000/', // port number will be the same from connect-ptor task

  framework: 'jasmine',

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['../test/e2e/protractor/**/*.js'],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    isVerbose : true,
    includeStackTrace : true
  }
};
