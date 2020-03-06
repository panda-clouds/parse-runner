const PCParseRunner = require('../src/PCParseRunner.js');

describe('test Mongo inserts', () => {
	it('should throw if we change mongo ', async () => {
		expect.assertions(1);

		const parseRunner = new PCParseRunner();

		parseRunner.prefillMongo(() => {
			throw new Error('Woah big fella, thats some bad json');
		});

		try {
			await parseRunner.startParseServer();
			expect(1).toBe(2);
		} catch (e) {
			expect(e.message).toBe('The PrefillMongo() function failed. Check recent changes to the data files you are trying to inject for syntax errors.');
			await parseRunner.cleanUp();
		}
	}, 2 * 60 * 1000);
});
