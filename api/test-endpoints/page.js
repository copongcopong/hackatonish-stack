module.exports = async (req, res) => {
  res.reply({ok: true, data: new Date()});
}