
const PCParseRunner = require('../src/PCParseRunner.js');
const PCBash = require('@panda-clouds/parse-bash');
let Parse;

describe('full project', () => {
	const parseRunner = new PCParseRunner();

	parseRunner.parseVersion('3.4.0');
	parseRunner.projectDir('./src/full-project');
	parseRunner.coverageDir('/tmp/testing/coverage');

	beforeAll(async () => {
		// await PCBash.runCommandPromise('docker build -t test-user/test-repo:1 src/full-project');

		// process.env.CI_PROD_IMAGE_AND_TAG = 'test-user/test-repo:1';
		Parse = await parseRunner.startParseServer();
	}, 1000 * 60 * 2);

	afterAll(async () => {
		await parseRunner.cleanUp();

		try {
			// this removed the coverage file required for coverageDir1 and coverageDir2
			await PCBash.runCommandPromise('rm -r ' + PCParseRunner.tempDir() + '/coverage');
		} catch (e) {
			// Disregard failures
		}
	});

	// This test is not found in CodeCoverageDir2
	// to test merging of "coverage" data
	it('should return only in 1', async () => {
		expect.assertions(1);
		const result = await Parse.Cloud.run('codeCove1');

		expect(result).toBe(1);
	});

	// it('should return everest', async () => {
	// 	expect.assertions(1);
	// 	const result = await Parse.Cloud.run('challenge');

	// 	expect(result).toBe('everest');
	// });

	it('should return self everest', async () => {
		expect.assertions(1);
		const result = await Parse.Cloud.run('selfChallenge');

		expect(result).toBe('everest');
	});

	it('should return pwd', async () => {
		expect.assertions(1);
		const result = await Parse.Cloud.run('pwd');

		expect(result).toContain('Dockerfile');
	});

	it('should return pwd-node', async () => {
		expect.assertions(1);
		const result = await Parse.Cloud.run('pwd-node');

		expect(result).toContain('@panda-clouds');
	});

	it('should read from neighboring file', async () => {
		expect.assertions(1);
		const result = await Parse.Cloud.run('other');

		expect(result).toBe('file');
	});
	it('should read from neighboring file2', async () => {
		expect.assertions(1);
		const result = await Parse.Cloud.run('other');

		expect(result).toBe('file');
	});
	it('should read from neighboring file3', async () => {
		expect.assertions(1);
		const result = await Parse.Cloud.run('other');

		expect(result).toBe('file');
	});
	it('should read from neighboring file4', async () => {
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
