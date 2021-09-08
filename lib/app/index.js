const polka = require('polka');
const app = polka();
const { json } = require('body-parser');
const send = require('@polka/send-type');
const loadDir = require('import-modules');
const uniqid = require('uniqid');
const logger = require('pino')()
const pino = require('pino-http')({
  genReqId: (req) => req._id
})

app.log = logger;
app.db = {
  models: loadDir('../../db/models')
};

app.use((req, res, next) => {
  const id = uniqid();
  req._id = id;
  req.db = app.db;
  req.log = app.log;
  res.reply = (data, code, head) => {
    if (!head) head = {};
    head = {...head, ...{
      'x-req-id': id
    }};
    send(res, code, data, head)
  }
  next();
});

if (process.env.NODE_ENV != 'test') {
  app.use(pino);
}

app.use(json());
app.get('/echo', (req, res) => {
  const data = { ts: new Date().getTime() };
  res.reply({ok: true, data, message: 'Hello world!'});
});

module.exports = app;