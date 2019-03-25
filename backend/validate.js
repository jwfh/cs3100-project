module.exports.validate = (req, res) => {
  res.status(202);
  res.send({ok:true});
  // res.status(406);
  // res.send({ok:false});
  switch (req.body.type) {
  case 'username':

    break;
  case 'secA':
  
    break;
  }
};