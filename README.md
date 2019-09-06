# htbhf-applicant-web-ui

[![Build Status](https://travis-ci.com/DepartmentOfHealth-htbhf/htbhf-applicant-web-ui.svg?branch=master)](https://travis-ci.com/DepartmentOfHealth-htbhf/htbhf-applicant-web-ui)
[![Known Vulnerabilities](https://snyk.io/test/github/DepartmentOfHealth-htbhf/htbhf-applicant-web-ui/badge.svg?targetFile=package.json)](https://snyk.io/test/github/DepartmentOfHealth-htbhf/htbhf-applicant-web-ui?targetFile=package.json)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Coverage Status](https://codecov.io/gh/DepartmentOfHealth-htbhf/htbhf-applicant-web-ui/branch/master/graph/badge.svg)](https://codecov.io/gh/DepartmentOfHealth-htbhf/htbhf-applicant-web-ui)

## Environment variables
Before starting the application or running tests, ensure that the correct environment variables have been set. A list of required environment variables are available in `sample.env`.
The environment variable `NOTIFY_API_KEY` is required, locally in your `.env` file needs to be a real test api key (not the whitelisted team one).

Locally the app uses [`dotenv`](https://www.npmjs.com/package/dotenv) to set environment variables. The easiest way to get started locally is to duplicate `sample.env` and rename to `.env`. `dotenv` will use the `.env` file to set environemt varaiables. It is important that `.env` is never commited to the code repository as it may contain sensitive data.

## Requirements
You will need Node and NPM installed to run the application, and Java installed to run the acceptance tests.

## User interface

### Design patterns
The application implements the GOV.UK design system. Visit the project website [https://design-system.service.gov.uk](https://design-system.service.gov.uk) for more information and documentation.

### Templating
To easily implement the GOV.UK design system, the application uses Nunjucks as a templating language. Visit the website [https://mozilla.github.io/nunjucks](https://mozilla.github.io/nunjucks) for more information and documentation.

### Creating a new step in the form
To add a new form step to the application, create an object matching the following schema

```
{
  path: String,
  next: String,
  template: String,
  sanitize: Express middleware (function or array),
  validate: Express middleware (function or array),
  pageContent : Object
}
```
See [name](src/web/routes/application/name/name.js) for an example.

Then add the step to the [list of steps](src/web/routes/application/steps.js)

### Translations
The application uses the library [i18next](https://github.com/i18next/i18next) to allow the user to view pages in different languages.
The requests [accept-language](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language) header is used to determine which language to render the page in.
Currently English and Welsh are supported (currently using Lorem Ipsum for Welsh until translations are provided).

To add support for a new language, the translation documents (.json files) must be added to [src/web/server/locales/](src/web/server/locales).
See [src/web/server/locales/en/common.json](src/web/server/locales/en/common.json) for an example.

If no accept-language header is provided the application will default to English.

## Tests

### Linting
The application uses Javascript Standard Style. Visit the project website [https://standardjs.com](https://standardjs.com) for more information and documentation. Plugins are available for various text editors.

### Unit
The application uses Tape for unit testing, visit [https://github.com/substack/tape](https://github.com/substack/tape) for documentation.

Unit tests can be started with the command `npm run test:unit`. The application will look for for tests in these locations:

- `./src/config/**/*.test.js`
- `./src/web/**/*.test.js`

Files containing unit tests in files must use the naming convention `*.test.js`.

### Smoke
The smoke tests can be found in the `src/test/smoke` directory and contain a very small set of tests
that are run to prove an environment is "up" and nothing more. They use the same page model as the acceptance
tests and can be run via `npm run test:smoke`. To run these tests against a local instance for debuggging
purposes, you simply need to set the environment variable `APP_HOST=http://localhost:8080` and it will run
against your local running instance.

### Acceptance, Compatibility & Performance
Acceptance & compatibility tests are provided by a separate repository - htbhf-acceptance-tests. 
Performance tests are provided by htbhf-performance-tests.
The versions of these projects compatible with the current web-ui are defined in `test_versions.properties`.

For running local tests you can create a `local_acceptance_tests.properties` file to specify the version of chromedriver
and the location of a local copy of the acceptance tests:
```
CHROMEDRIVER_VERSION=76.0.3809.68
# if you're not using chromedriver_linux64, also specify CHROMEDRIVER_URL:
CHROMEDRIVER_URL=https://chromedriver.storage.googleapis.com/76.0.3809.68/chromedriver_linux64.zip
# if you want to use a local copy of the acceptance tests:
USE_LOCAL_ACCEPTANCE_TESTS=true
ACCEPTANCE_TESTS_DIR=../htbhf-acceptance-tests
```
Bear in mind that the CI build will always run the version of the acceptance tests specified in `test_versions.properties`.

## GOV.UK Notify
The application requires users to enter a confirmation code that has been sent to their email address
or mobile phone via GOV.UK Notify. In order to send such an email you need to be able to connect to GOV.UK Notify.
When running locally this means you need to have the NOTIFY_API_KEY environment variable set - see sample.env for an example.

### The Session Details App
To enable tests to work without having to actually receive the confirmation code, a separate app (session-details-app)
can be deployed to provide access to the confirmation code stored in the session.
This app is started when running tests, but you can also start it manually using the `test:session-details` script in `package.json`

## Feature toggle
It is possible to turn off any step in the app using a feature toggle key:

### 1. Add a feature toggle key to the step definition
Adding a `toggle` property to a step definition will remove the step from the application. This ensures that all toggled steps are **disabled** by default:

```
const myStep = {
  path: '/my-step',
  template: 'my-step',
  toggle: 'MY_STEP_ENABLED'
  ...
}
```

If a step is disabled ensure there are no direct references to the steps `path` property. i.e. the `next` property of another step does not reference the disabled step.

### 2. Add the feature toggle key to `features.json`
Adding a feature toggle key to `features.json` allows the step to be **enabled** or **disabled** by setting the value of the key to `true` or `false` respectively. e.g. the following json will disable any step with the feature toggle key `MY_STEP_ENABLED`:

```
{
  "MY_STEP_ENABLED": false
}
```

### 3. Add the feature toggle key to the step in the acceptance tests
Adding the feature toggle key to the associated step in `./src/test/common/steps/navigation/step-page-actions.js` ensures that the acceptance tests use the same feature toggles as the application:

```
{
  page: (pages) => pages.myStep,
  actions: async () => completeMyStepAndSubmit(),
  toggle: 'MY_STEP_ENABLED'
}
```

### 4. Add the feature toggle key to the step in the a11y tests
Adding the feature toggle key to the associated step in `./src/test/a11y/tests` ensures that the a11y tests use the same feature toggles as the application:

```
{
  url: URLS['MY_STEP'],
  formData: () => ({
    someValue: SOME_VALID_DATA
  }),
  toggle: 'MY_STEP_ENABLED'
}
```
