class PCPromise {
	constructor() {
		// Empty Constructor
	}

	static wait(ms) {
		return new Promise(res => setTimeout(res, ms));
	}
}

module.exports = PCPromise;
