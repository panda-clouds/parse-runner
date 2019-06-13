
const PCParseRunner = require('../src/PCParseRunner.js');
const PCBash = require('@panda-clouds/parse-bash');
let Parse;

describe('full project', () => {
	const parseRunner = new PCParseRunner();

	parseRunner.parseVersion('3.4.0');
	parseRunner.projectDir('./src/full-project');
	parseRunner.coverageDir('/tmp/testing/coverage');

	beforeAll(async () => {
		// await PCBash.runCommandPromise('docker build -t test-user/test-repo:2 src/full-project');

		// process.env.CI_PROD_IMAGE_AND_TAG = 'test-user/test-repo:2';
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

	// this one test is omitted from the CodeCoverageDir1
	// so we could test merging of "coverage" data
	it('should return only in 2', async () => {
		expect.assertions(1);
		const result = await Parse.Cloud.run('codeCove2');

		expect(result).toBe(2);
	});
});
