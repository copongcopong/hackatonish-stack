const dayjs = require('dayjs');
const { ModelBase } = require('./ModelBase');

class ClientModel extends ModelBase {
  static get tableName() {
    return 'clients';
  }

}

module.exports = ClientModel