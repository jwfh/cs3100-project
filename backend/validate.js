module.exports.validate = (req, res) => {
  res.status(202);
  res.send({ok: true});
  switch (req.body.type) {
  case 'username':
    break;
  case 'secA':
    break;
  }
};
