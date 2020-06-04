// Just a playground
// const cryptoRandomString = require('crypto-random-string');
// const min = 1024;
// const max = 65535;

// describe('test', () => {
// 	it('seedrandom should be random', () => {
// 		expect.assertions(1);
// 		let duplicates = 0;

// 		for (let i = 10000; i >= 0; i--) {
// 			const start = new Date();
// 			const allValues = [];

// 			for (let j = 10; j >= 0; j--) {
// 				// Autoseeded ARC4-based PRNG.
// 				const randomNumber = cryptoRandomString({ length: 10, type: 'numeric' });
// 				const one = Math.floor(parseFloat('0.' + randomNumber) * (max - min + 1) + min);
// 				// const two = Math.floor(rng() * (max - min + 1) + min);

// 				allValues.push(one);
// 				// allValues.push(two);
// 			}
// 			console.log('seedrandom: ' + (new Date().getTime() - start.getTime()) + 'ms ' + allValues);
// 			const hasDuplicate = allValues.some((val, i) => allValues.indexOf(val) !== i);

// 			if (hasDuplicate) {
// 				duplicates ++;
// 			}
// 		}


// 		expect(duplicates).toBeLessThan(15);
// 	});

// 	it('math.random() should not be random', () => {
// 		expect.assertions(1);
// 		let duplicates = 0;

// 		for (let i = 10000; i >= 0; i--) {
// 			const start = new Date();
// 			const allValues = [];

// 			for (let j = 10; j >= 0; j--) {
// 				const one = Math.floor(Math.random() * (max - min + 1) + min);
// 				// const two = Math.floor(rng() * (max - min + 1) + min);

// 				allValues.push(one);
// 				// allValues.push(two);
// 			}
// 			console.log('Math.random: ' + (new Date().getTime() - start.getTime()) + 'ms ' + allValues);
// 			const hasDuplicate = allValues.some((val, i) => allValues.indexOf(val) !== i);

// 			if (hasDuplicate) {
// 				duplicates ++;
// 			}
// 		}


// 		expect(duplicates).toBeLessThan(1);
// 	});
// });
