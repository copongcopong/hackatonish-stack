const { Model } = require('objection');
const dayjs = require('dayjs');
const Knex = require('knex');
const config = require('../config');
const knex = Knex(config);
Model.knex(knex);

class ModelBase extends Model {
  $beforeUpdate() {
    this.updated = dayjs().format('YYYY-MM-DD HH:mm:ss');
  }  
  $beforeInsert() {
    this.created = dayjs().format('YYYY-MM-DD HH:mm:ss');
  }

  static async rquery(sql) {
    var b = await this.knex().raw(sql);
    return b[0]; 
  }

}
module.exports.ModelBase = ModelBase;