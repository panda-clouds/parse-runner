
require('./otherFile.js');

Parse.Cloud.define('challenge', () => {
	return 'everest';
});

Parse.Cloud.define('pwd', () => {
	const testFolder = '.';
	const fs = require('fs');

	fs.readdirSync(testFolder).forEach(file => {
	  console.log(file);
	});
});

Parse.Cloud.define('mainHasWhitespace', () => {
	const PCString = require('@panda-clouds/string');

	return PCString.hasWhitespace('ya> <here');
});

Parse.Cloud.define('mainDoesntHasWhitespace', () => {
	const PCString = require('@panda-clouds/string');

	return PCString.hasWhitespace('no');
});
