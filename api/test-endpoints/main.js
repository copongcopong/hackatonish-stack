module.exports = async (req, res) => {
  const { Client } = req.db.models;
  const all = await Client.query().findOne({id: 1});

  res.reply({ok: true, data: all});
}