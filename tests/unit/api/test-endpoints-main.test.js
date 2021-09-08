
const chai = require('chai');
const app = require('../../../app');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const api = app.handler;
const assert = require('chai').assert;
const sinon = require('sinon');
const fixtures = require('../../fixtures/data');
const objection = require('objection');
const { QueryBuilder } = objection;


describe('GET /test-endpoints', () => {
  var sandbox;
  before(() => {
    const { Client } = app.db.models;
    sandbox = sinon.createSandbox();
    sandbox.stub(app.db.models, 'Client').value({
      query: () => QueryBuilder.forClass(Client).resolve(fixtures.data.clientOne)
    })
    
  });
  after(() => {
    sandbox.restore();
  })
  it('it should return ok:true',  (done) => {

    chai.request(api)
      .get('/test-endpoints')
      .end((err, ctx) => {
        //console.log(err, ctx.body)
        assert.equal(ctx.status, 200);
        assert.equal(ctx.body.ok, true);
        done()
      })
  })
});