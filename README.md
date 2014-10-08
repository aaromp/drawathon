
# AngularFire-seed

This project is an application skeleton for a typical [AngularFire](http://angularfire.com/) web app.
This library allows you to quickly bootstrap real-time apps using [Firebase](http://www.firebase.com) and [AngularJS](http://www.angularjs.org).

The seed contains AngularJS libraries, test libraries and a bunch of scripts all preconfigured for
instant web development gratification.

The seed app doesn't do much, just shows how to wire controllers and views together and persist them
in Firebase. You can check it out by opening app/index.html by running ```$ gulp```.

### Running the app in production

Make sure you set up security rules for your Firebase! An example for this
seed can be found in `config/security-rules.json`

Go to your Forge (open your Firebase URL in the browser) and add your sites domain name under
Auth -> Authorized Request Origins. This allows simple login to work from your web site as well as localhost.

The rest really depends on how complex is your app and the overall infrastructure of your system, but
the general rule is that all you need in production are all the files under the `app/` directory.
Everything else can be omitted.

Angular apps are really just a bunch of static html, css and js files that just need to be hosted
somewhere, where they can be accessed by browsers.

If your Angular app is talking to the backend server via xhr or other means, you need to figure
out what is the best way to host the static files to comply with the same origin policy if
applicable. Usually this is done by hosting the files by the backend server or through
reverse-proxying the backend server(s) and a webserver(s).


## Testing

To run Karma Unit tests execute
```bash
$ gulp karma-unit
```

To run Karma E2E tests execute
```bash
$ gulp karma-e2e
``` 

To run All tests execute
```bash
$ gulp test
```

## Directory Layout

    app/                --> all of the files to be used in production
      css/              --> css files
        app.css         --> default stylesheet
      img/              --> image files
      index.html        --> app layout file (the main html template file of the app)
      index-async.html  --> just like index.html, but loads js files asynchronously
      js/               --> javascript files
        angular-firebase/*  --> Moved all CDN js refs to local for a smooth refersh on reload
        lib/*           --> Bower dependencies will be installed here
        app.js          --> application
        config.js       --> custom angularFire config file
        controllers.js  --> application controllers
        directives.js   --> application directives
        filters.js      --> custom angular filters
        services.js     --> custom angular services
      partials/             --> angular view partials (partial html templates)
        home.html           --> a rudimentary $firebase().$bind() example
        chat.html           --> a $firebase() sync used as an array, with explicit bindings
        login.html          --> authentication and registration using $firebaseAuth
        account.html        --> a secured page (must login to view this)
    config/karma.conf.js        --> config file for running unit tests with Karma
    config/karma-e2e.conf.js    --> config file for running e2e tests with Karma
    config/security-rules.json  --> sample security rules for your Firebase
    test/               --> test source files and libraries
      e2e/              -->
        runner.html     --> end-to-end test runner (open in your browser to run)
        scenarios.js    --> end-to-end specs
      lib/
        angular/                --> angular testing libraries
          angular-mocks.js      --> mocks that replace certain angular services in tests
          angular-scenario.js   --> angular's scenario (end-to-end) test runner library
          version.txt           --> version file
      unit/                     --> unit level specs/tests
        *Spec.js                --> specs for a specific module in app/js

## Contact

* More information on AngularFire: http://angularfire.com
* More information on Firebase: http://firebase.com
* More information on AngularJS: http://angularjs.org/

## LICENCE

[MIT](http://firebase.mit-license.org/)