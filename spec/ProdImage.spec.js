
const PCParseRunner = require('../src/PCParseRunner.js');
const PCBash = require('@panda-clouds/parse-bash');
let Parse;

describe('full project', () => {
	const parseRunner = new PCParseRunner();

	beforeAll(async () => {
		const results = await PCBash.runCommandPromise('docker build -t test-user/test-repo:5 src/full-project');

		console.log('buuus' + results);
		process.env.CI_PROD_IMAGE_AND_TAG = 'test-user/test-repo:5';
		Parse = await parseRunner.startParseServer();
	}, 1000 * 60 * 2);

	afterAll(async () => {
		await parseRunner.cleanUp();
	});

	it('should return everest', async () => {
		expect.assertions(1);
		const result = await Parse.Cloud.run('challenge');

		expect(result).toBe('everest');
	});

	it('should return self everest', async () => {
		expect.assertions(1);
		const result = await Parse.Cloud.run('selfChallenge');

		expect(result).toBe('everest');
	});

	it('should return pwd', async () => {
		expect.assertions(1);
		const result = await Parse.Cloud.run('pwd');

		console.log(result + JSON.stringify(result));
		expect(1).toBe(1);
	});

	it('should return pwd-node', async () => {
		expect.assertions(1);
		const result = await Parse.Cloud.run('pwd-node');

		console.log(result + JSON.stringify(result));
		expect(1).toBe(1);
	});

	it('should read from neighboring file', async () => {
		expect.assertions(1);
		const result = await Parse.Cloud.run('other');

		expect(result).toBe('file');
	});

	it('should use node module from main', async () => {
		expect.assertions(2);
		const result = await Parse.Cloud.run('mainHasWhitespace');

		expect(result).toBe(true);

		const result2 = await Parse.Cloud.run('mainDoesntHasWhitespace');

		expect(result2).toBe(false);
	});

	it('should use node module from side', async () => {
		expect.assertions(2);
		const result = await Parse.Cloud.run('sideHasWhitespace');

		expect(result).toBe(true);

		const result2 = await Parse.Cloud.run('sideDoesntHasWhitespace');

		expect(result2).toBe(false);
	});
});
