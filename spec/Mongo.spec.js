const PCParseRunner = require('../src/PCParseRunner.js');
let Parse;

describe('test Mongo inserts', () => {
	const parseRunner = new PCParseRunner();

	parseRunner.parseVersion('3.1.3');

	beforeAll(async () => {
		Parse = await parseRunner.startParseServer();
	}, 1000 * 60 * 2);

	afterAll(async () => {
		await parseRunner.cleanUp();
	});

	beforeEach(async () => {
		await parseRunner.dropDB();
	}, 1000 * 60 * 2);

	it('should add a user to mongo', async () => {
		expect.assertions(2);

		const data = { _id: 'ABC',
			foo: 'bar' };

		parseRunner.insertOne('_User', data);

		const query = new Parse.Query('_User');
		const result = await query.find();

		expect(result).toHaveLength(1);
		expect(result[0].id).toBe('ABC');
		expect(result[0].get('foo')).toBe('bar');
	});

	// it('should add many users to mongo', async () => {
	// 	expect.assertions(2);

	// 	const data = [{ _id: 'DEF',
	// 		foo: 'bar' },
	// 	{ _id: 'HIJ',
	// 		foo: 'bar' }];

	// 	parseRunner.insertMany('_User', data);

	// 	const query = new Parse.Query('_User');
	// 	const result = await query.find();

	// 	expect(result).toHaveLength(1);
	// 	expect(result[0].id).toBe('DEF');
	// 	expect(result[0].get('foo')).toBe('bar');
	// });
});
