const app = require('./app'); // the actual Express application
const http = require('http');
const config = require('./utils/config');
const logger = require('./utils/logger');

const server = http.createServer(app);
console.log(config, 'CONFIG ');

server.listen(config.PORT, () => {
	logger.info('connecting to PORT', config.PORT);
});
