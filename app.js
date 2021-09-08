const app = require('./lib/app');
const test = require('./api/test-endpoints');
app.use('test-endpoints', test);

module.exports = app;