
const chai = require('chai');
const app = require('../../../app');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const api = app.handler;
const assert = require('chai').assert;
const sinon = require('sinon');
const fixtures = require('../../fixtures/data');


describe('GET /test-endpoints/page', () => {
  var sandbox;
  before(() => {
    sandbox = sinon.createSandbox();
    
  });
  after(() => {
    sandbox.restore();
  })
  it('it should return ok:true',  (done) => {

    chai.request(api)
      .get('/test-endpoints/page')
      .end((err, ctx) => {
        //console.log(err, ctx.body)
        assert.equal(ctx.status, 200);
        assert.equal(ctx.body.ok, true);
        done()
      })
  })
});