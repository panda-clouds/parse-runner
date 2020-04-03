node -e 'const PCParseRunner = require("./src/PCParseRunner.js"); const parseRunner = new PCParseRunner(1337,27017); parseRunner.cleanUp()'
node -e 'const PCParseRunner = require("./src/PCParseRunner.js"); const parseRunner = new PCParseRunner(1337,27017); parseRunner.startParseServer()'
read  -n 1 -p "Press any key to tear down" mainmenuinput 
node -e 'const PCParseRunner = require("./src/PCParseRunner.js"); const parseRunner = new PCParseRunner(1337,27017); parseRunner.cleanUp()'
