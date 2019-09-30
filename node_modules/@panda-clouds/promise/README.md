
PCPromise
=========
maintained by [PandaClouds.com](https://pandaclouds.com)

`PCPromise` provides utility functions for javascript promises and async/await.


Installation
------------

1. If you want to use this library, you first need to install the [Node.js](https://nodejs.org/en/).

2. When you install node.js, will also be installed [npm](https://www.npmjs.com/).

3. Please run the following command.

```
npm install --save @panda-clouds/promise
```

Usage
-----

### Node.js

```javascript
const PCPromise = require('@panda-clouds/promise');

// example usage
async () => {
	await PCPromise.wait(5000) // pauses for 5 seconds without blocking the main thread
}


```

You can replace PCPromise with any variable.


Methods
-------

[Unit Tests] are an additional resource for learning functionality.

### - wait()

Pauses execution of that thread without blocking

Example:

```javascript
async () => {
	await PCPromise.wait(5000) // pauses for 5 seconds without blocking the main thread
}
```



Contributions
-------------

Pull requests are welcome! here is a checklist to speed things up:

- modify `PCPromise.js`
- add unit tests in `PCPromise.spec.js`
- run `npm test`
- document method in `README.md`
- add your name to 'Contributors' in `README.md`


### Contributors

(Add your name)

- [*] [Marc Smith](https://github.com/mrmarcsmith)


[Unit Tests]: https://github.com/panda-clouds/string/blob/master/spec/PCPromise.spec.js
