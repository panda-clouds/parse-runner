## PCParseRunner Changelog

### 0.43.0
- Added no-cov if we arent tracking coverage

### 0.42.0
- Added reloadFiles function for file tracking on live development

### 0.41.0
- Added Client key for local testing
- renamed "example-app-id" to "local-app-id"

### 0.40.0
- Added local testing example

### 0.38.0
- Changed setEnvironmentFromFile to use require

### 0.37.0
- Fixed "setEnvironmentFromFile"
- Fixed "port in use" bug (Math.random is same millisecond)

### 0.36.0
- Reverted (0.31.0 --rm flag to other parse container) because we lose log info for crashed servers

### 0.32.0
- Increased timeout to 60 seconds

### 0.31.0
- Added --rm flag to other parse container
- Added catch block for when "prefillMongo" fails

### 0.30.0
- Added label=parse-runner
- Added --rm flag to parse container

### 0.29.0
- bumped default parse server to 3.10.0
- changed timeout from 20 seconds to 30

### 0.28.0
- Renamed "injectedPushConfig" to "specInjectionPushConfig" so parse coverage could ignore with wildcard

### 0.27.0
- Added printAll function

### 0.26.0
- Added loadDefaultPushAdapter

### 0.25.0
- Added Push injection

### 0.24.1
- Fixed insertOne failing when a property is set to "null"

### 0.24.0
- Moved moment from "dev dep" to "dep"
- npm audit fix

### 0.23.0

- Added inflating of pointers and date objects from a JSON file.

### 0.22.0

- Added getClock()

### 0.21.0

- Added spec for Clock functionality Added to Parse-Coverage
- Added setClock and resetClock

### 0.20.0

- removed coverageDir and replaced with only a bool that turns coverage off

### 0.19.0

- bumped default parse-server version to 3.4.4
- Added test for throwing error with a spec helper

### 0.18.0

- Added "helperClass" and "callHelper"
- moved .nyc_output and .nyc_cache to coverage for easy deleting and ignoring since...
- we gave up on jest direct unit tests because jest deletes the 'coverage' directory each time and can't be configured

### 0.17.0

- conformed to nyc standard directories in an attempt to combines reports

### 0.16.0

- Added the ability to inject functions into a spec for testing

### 0.15.0

- fixed bug where code coverage was incomplete because "cloud" volume was removed too early

### 0.14.0

- fixed "setNewUrlParser" to "useNewUrlParser"

### 0.13.0

- Added code coverage to the docker container

### 0.11.0

- Turned off "npm install" by default
- changed default location of "main.js"
- fixed tests pointing to main.js
- checked in node_modules for faster testing
- Added "prodImageAndTag" for exact prod testing

### 0.10.0

- Added prefill mongo function

### 0.9.0

-fixed port issue where dockerfile overrides the port back to 1337

### 0.8.0

- Added serverConfig
- Added insertOne
- Added insertMany
- Added No Cloud Code spec and fix

### 0.7.0

- changed mongoURL to "mongodb" instead of "http"

### 0.6.0

- exposed mongoURL

### 0.5.0

- upgraded npm packages

### 0.4.0

- changed "loadFile" to "projectDir"
- fixed ci errors

### 0.3.0

- returned the Parse global for setting in Test scope

### 0.2.0

- Added logs for when parse server crashes

### 0.1.0

- initial Commit