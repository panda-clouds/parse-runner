
describe('the PCPromise.js class', () => {
	const PCPromise = require('../src/PCPromise.js');

	it('should wait', async () => {
		expect.assertions(1);

		const startTime = new Date().getTime();

		await PCPromise.wait(5000);

		const endTime = new Date().getTime();

		expect(endTime - startTime).toBeGreaterThan(4999);
	}, 10 * 1000);
});
