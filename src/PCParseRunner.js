/* global Promise */
const fs = require('fs');
const notBothError = 'Only set projectDir OR cloud, Not Both.';
const MongoClient = require('mongodb').MongoClient;

fs.readFileAsync = filename => {
	return new Promise((resolve, reject) => {
		fs.readFile(filename, (err, buffer) => {
			if (err) {
				reject(err);
			} else {
				resolve(buffer.toString());
			}
		});
	});
};

const PCBash = require('@panda-clouds/parse-bash');
const Parse = require('parse/node');
const exampleAppId = 'example-app-id';
const exampleJavascriptKey = 'example-javascript-key';
const exampleMasterKey = 'example-master-key';

class PCParseRunner {
	constructor() {
		this.seed = PCParseRunner.randomIntFromInterval(0, 99999);
		// these random port are opened to the public to health check the services
		// actual container to container communication happens over the network bridge
		this.mongoPort = PCParseRunner.randomPort(); // 27017;
		this.parsePort = PCParseRunner.randomPort(); // 1337;
		this.parseVersionValue = '3.1.3';
		this.mainPath = 'main.js';
		this.networkName = 'network-' + this.seed;
		this.networkFlag = '--network ' + this.networkName;
		this.serverConfigObject = {};
	}

	parseVersion(version) {
		this.parseVersionValue = version;
	}

	main(path) {
		this.mainPath = path;
	}

	projectDir(path) {
		if (this.cloudPage) {
			throw new Error(notBothError);
		}

		this.projectDirValue = path;
	}

	cloud(cloudPage) {
		if (this.projectDirValue) {
			throw new Error(notBothError);
		}

		this.cloudPage = cloudPage;
	}

	static defaultDBName() {
		return 'parse-test';
	}

	// convience function
	async insertOne(className, object) {
		const connectionString = this.mongoURL();
		const client = await MongoClient.connect(connectionString,
			{ setNewUrlParser: true });

		const db = client.db(PCParseRunner.defaultDBName());

		let res = null;

		try {
			res = await db.collection(className).insertOne(object);
		} finally {
			client.close();
		}

		return res;
	}

	async insertMany(className, objects) {
		const connectionString = this.mongoURL();
		const client = await MongoClient.connect(connectionString,
			{ setNewUrlParser: true });

		const db = client.db(PCParseRunner.defaultDBName());

		let res = null;

		try {
			res = await db.collection(className).insertMany(objects);
		} finally {
			client.close();
		}

		return res;
	}

	// used for injecting data into mongo before testing
	mongoURL() {
		return 'mongodb://localhost:' + this.mongoPort;
	}

	static tempDir() {
		// This failed because we use Jenkins in docker.
		// the 'write' would go into the jenkins container
		// and the 'read' would go to the host through the docker.sock
		// also we couldn't match the jenkins volume (which would work)
		// because the new one kept saying 'invalid username/password'

		// A: https://github.com/jenkinsci/docker/issues/174
		// basically, you can't just move the dir
		// // we have a 'temp' directory in the root of this projects
		// var path = __dirname;

		// // Notice the double-backslashes on this following line
		// path = path.replace(/ /g, '\\ ');

		// // eslint-disable-next-line no-console
		// console.log('tempDir: ' + path)
		// return path;
		return '/tmp/testing';
	}

	static randomIntFromInterval(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	static randomPort() {
		return PCParseRunner.randomIntFromInterval(1024, 65535);
	}
	static test() {
		return 'hi';
	}

	serverConfig(config) {
		this.serverConfigObject = config;
	}

	async startParseServer() {
		process.env.TESTING = true;


		// if (process.env.SPEC_USE_EXTERNAL_SERVER) {
		// 	Parse.initialize(exampleAppId, exampleJavascriptKey, exampleMasterKey);
		// 	Parse.serverURL = 'http://localhost:' + this.parsePort + '/1';

		// 	return Parse;
		// }

		await PCBash.runCommandPromise('docker network create ' + this.networkName);

		await PCBash.runCommandPromise('mkdir -p ' + PCParseRunner.tempDir());

		const makeMongo = 'docker run --rm -d ' + this.networkFlag + ' ' +
				'--name mongo-' + this.seed + ' ' +
				'-p ' + this.mongoPort + ':27017 ' +
				'mongo ' +
				'';

		await PCBash.runCommandPromise(makeMongo);

		// make the cloud dir before copying
		await PCBash.runCommandPromise('mkdir -p ' + PCParseRunner.tempDir() + '/cloud-' + this.seed);

		if (this.projectDirValue) {
			await PCBash.runCommandPromise('cp -r ' + this.projectDirValue + '/. ' + PCParseRunner.tempDir() + '/cloud-' + this.seed);
			await PCBash.runCommandPromise('cd ' + PCParseRunner.tempDir() + '/cloud-' + this.seed + '; npm install');
		} else if (this.cloudPage) {
			this.mainPath = 'main.js';
			await PCBash.putStringInFile(this.cloudPage, PCParseRunner.tempDir() + '/cloud-' + this.seed + '/main.js');
		}

		const config = {};

		config.allowInsecureHTTP = true;
		const app = {};

		app.appId = exampleAppId;
		app.masterKey = exampleMasterKey;
		app.javascriptKey = exampleJavascriptKey;
		app.port = this.parsePort;
		app.mountPath = '/1';
		// app.databaseName = PCParseRunner.defaultDBName();
		// we hardcode 27017 because all C2C communication is linked with a bridge
		app.databaseURI = 'mongodb://mongo-' + this.seed + ':27017/' + PCParseRunner.defaultDBName();
		app.publicServerURL = 'http://localhost:' + app.port + app.mountPath;
		app.serverURL = app.publicServerURL;

		if (this.projectDirValue || this.cloudPage) {
			app.cloud = '/parse-server/cloud/' + this.mainPath;
		}

		const combinedApp = { ...app, ...this.serverConfigObject };

		console.log('snickers ' + JSON.stringify(combinedApp));

		config.apps = [combinedApp];

		await PCBash.putStringInFile(config, PCParseRunner.tempDir() + '/config-' + this.seed);

		await PCBash.runCommandPromise('pwd');

		// wait for mongo to come up so we don't get a connection error
		try {
			await PCBash.runCommandPromise(
				'export PC_RUNNER_MONGO_TRIES=10\n' +
				'until $(curl --output /dev/null --silent --fail http://localhost:' + this.mongoPort + '); do\n' +
				'    printf \'Waiting for Mongo to come up...\n\'\n' +
				'    sleep 1\n' +
				'    ((PC_RUNNER_MONGO_TRIES--))\n' +
				'    if [ "$PC_RUNNER_MONGO_TRIES" -eq "0" ]; then\n' +
				'        echo "Timed out";\n' +
				'        exit 1;\n' +
				'    fi\n' +
				'done'
			);
		} catch (e) {
			throw new Error('Mongo is in a crash loop. Please try again');
		}

		const makeParse = 'docker run -d ' + this.networkFlag + ' ' +
		'--name parse-' + this.seed + ' ' +
		'-v ' + PCParseRunner.tempDir() + '/config-' + this.seed + ':/parse-server/configuration.json ' +
		'-v ' + PCParseRunner.tempDir() + '/cloud-' + this.seed + ':/parse-server/cloud/ ' +
		'-p ' + this.parsePort + ':1337 ' +
		'parseplatform/parse-server:' + this.parseVersionValue + ' ' +
		'/parse-server/configuration.json';

		await PCBash.runCommandPromise(makeParse);

		try {
			await PCBash.runCommandPromise(
				'export PC_RUNNER_PARSE_TRIES=10\n' +
				'until $(curl --output /dev/null --silent --head --fail http://localhost:' + this.parsePort + '/1/health); do\n' +
				'    printf \'Waiting for Parse Server to come up...\n\'\n' +
				'    sleep 1\n' +
				'    ((PC_RUNNER_PARSE_TRIES--))\n' +
				'    if [ "$PC_RUNNER_PARSE_TRIES" -eq "0" ]; then\n' +
				'        echo "Timed out. here are logs:";\n' +
				'        docker logs parse-' + this.seed + ';\n' +
				'        exit 1;\n' +
				'    fi\n' +
				'done'
			);
		} catch (e) {
			throw new Error('Parse Server crashed. Please check logs to debug cloud or configuration issues.');
		}

		Parse.initialize(exampleAppId, exampleJavascriptKey, exampleMasterKey);
		Parse.serverURL = 'http://localhost:' + this.parsePort + '/1';
		// eslint-disable-next-line no-console
		console.log('Parse Server up and running');

		return Parse;
	}

	async dropDB() {
		await PCBash.runCommandPromise('docker exec mongo-' + this.seed + ' mongo ' + PCParseRunner.defaultDBName() + ' --eval "db.dropDatabase()"');
	}

	async cleanUp() {
		process.env.TESTING = true;

		if (process.env.SPEC_USE_EXTERNAL_SERVER) {
			// no clean up
			return;
		}

		try {
			await this.dropDB();
		} catch (e) {
			// Disregard failures
		}

		try {
			await PCBash.runCommandPromise('docker logs parse-' + this.seed);
		} catch (e) {
			// Disregard failures
		}

		try {
			await PCBash.runCommandPromise('rm ' + PCParseRunner.tempDir() + '/config-' + this.seed);
		} catch (e) {
			// Disregard failures
		}

		try {
			if (this.projectDirValue || this.cloudPage) {
				await PCBash.runCommandPromise('rm -r ' + PCParseRunner.tempDir() + '/cloud-' + this.seed);
			}
		} catch (e) {
			// Disregard failures
		}

		try {
			await PCBash.runCommandPromise('docker stop parse-' + this.seed);
		} catch (e) {
			// Disregard failures
		}

		try {
			await PCBash.runCommandPromise('docker rm parse-' + this.seed);
		} catch (e) {
			// Disregard failures
		}

		try {
			await PCBash.runCommandPromise('docker stop mongo-' + this.seed);
		} catch (e) {
			// Disregard failures
		}

		try {
			await PCBash.runCommandPromise('docker network rm ' + this.networkName);
		} catch (e) {
			// Disregard failures
		}
	}
}

module.exports = PCParseRunner;
