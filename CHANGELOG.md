## PCParseRunner Changelog

### 0.14.0

- fixed "setNewUrlParser" to "useNewUrlParser"

### 0.13.0

- added code coverage to the docker container

### 0.11.0

- Turned off "npm install" by default
- changed default location of "main.js"
- fixed tests pointing to main.js
- checked in node_modules for faster testing
- added "prodImageAndTag" for exact prod testing

### 0.10.0

- added prefill mongo function

### 0.9.0

-fixed port issue where dockerfile overrides the port back to 1337

### 0.8.0

- added serverConfig
- added insertOne
- added insertMany
- added No Cloud Code spec and fix

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

- added logs for when parse server crashes

### 0.1.0

- initial Commit