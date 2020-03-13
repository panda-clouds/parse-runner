const PCParseRunner = require('../src/PCParseRunner.js');

describe('test randomPort race condition', () => {
	it('should avoid duplicate ports', () => {
		expect.assertions(1);

		for (let i = 5000 - 1; i >= 0; i--) {
			const val1 = PCParseRunner.randomPort();
			const val2 = PCParseRunner.randomPort();

			if (val1 === val2) {
				expect(1).toBe(2);
			}
		}
		expect(1).toBe(1);
	}, 2 * 60 * 1000);
});
