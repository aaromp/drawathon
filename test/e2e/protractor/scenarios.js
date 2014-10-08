'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('my app', function() {

  browser.get('index.html');

  it('should automatically redirect to /home when location hash/home is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/home");
  }); 
});
