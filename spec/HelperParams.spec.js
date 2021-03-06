// Manualy testing ONLY
// this doesn't actually check anything and breaks CI with the following error

// Error: ENOENT: no such file or directory, mkdir '/parse-server/.nyc_output/processinfo'
//     at Object.mkdirSync (fs.js:752:3)
//     at Function.module.exports.sync (/usr/local/lib/node_modules/nyc/node_modules/make-dir/index.js:97:6)
//     at NYC.createTempDirectory (/usr/local/lib/node_modules/nyc/index.js:313:12)
//     at NYC.reset (/usr/local/lib/node_modules/nyc/index.js:318:10)
//     at Object.<anonymous> (/usr/local/lib/node_modules/nyc/bin/nyc.js:33:9)
//     at Module._compile (internal/modules/cjs/loader.js:701:30)
//     at Object.Module._extensions..js (internal/modules/cjs/loader.js:712:10)
//     at Module.load (internal/modules/cjs/loader.js:600:32)
//     at tryModuleLoad (internal/modules/cjs/loader.js:539:12)
//     at Function.Module._load (internal/modules/cjs/loader.js:531:3)

const PCParseRunner = require('../src/PCParseRunner.js');
// const PCBash = require('@panda-clouds/parse-bash');

describe('full project', () => {
	const parseRunner = new PCParseRunner();

	parseRunner.helperClass('./NumberHelper.js');
	parseRunner.projectDir(__dirname + '/../src/full-project');
	parseRunner.collectCoverage(false);
	// parseRunner.coverageDir(__dirname + '/../coverage');
	beforeAll(async () => {
		// await PCBash.runCommandPromise('docker build -t test-user/test-repo:1 src/full-project');

		// process.env.CI_PROD_IMAGE_AND_TAG = 'test-user/test-repo:1';
		await parseRunner.startParseServer();
	}, 1000 * 60 * 2);

	afterAll(async () => {
		await parseRunner.cleanUp();

		// try {
		// 	// this removed the coverage file required for coverageDir1 and coverageDir2
		// 	await PCBash.runCommandPromise('rm -r ' + PCParseRunner.tempDir() + '/my-project');
		// } catch (e) {
		// 	// Disregard failures
		// }
	});

	// This test is not found in CodeCoverageDir2
	// to test merging of "coverage" data
	it('should handle 1 param', async () => {
		expect.assertions(1);
		const result = await parseRunner.callHelper('add1Number', [5]);

		expect(result).toBe(5);
	});

	it('should handle 2 params', async () => {
		expect.assertions(1);
		const result = await parseRunner.callHelper('add2Numbers', [5, 7]);

		expect(result).toBe(12);
	});

	it('should handle 3 params', async () => {
		expect.assertions(1);
		const result = await parseRunner.callHelper('add3Numbers', [5, 7, 9]);

		expect(result).toBe(21);
	});

	it('should handle 10 params', async () => {
		expect.assertions(1);
		const result = await parseRunner.callHelper('add10Numbers', [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);

		expect(result).toBe(55);
	});
});
