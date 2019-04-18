
const PCParseRunner = require('../src/PCParseRunner.js');
const Parse = require('parse/node');

describe('full project', () => {
	const parseRunner = new PCParseRunner();

	parseRunner.parseVersion('3.1.3');
	parseRunner.projectDir('./src/full-project');
	parseRunner.main('strangeMain.js');

	beforeAll(async () => {
		await parseRunner.startParseServer();
	}, 1000 * 60 * 2);

	afterAll(async () => {
		await parseRunner.cleanUp();
	});

	it('should return everest', async () => {
		expect.assertions(1);
		const result = await Parse.Cloud.run('challenge');

		expect(result).toBe('everest');
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
