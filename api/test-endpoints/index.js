const polka = require('polka');

module.exports = polka()
  .all('/', require('./main'))
  .all('/page', require('./page'))