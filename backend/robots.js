const rules = {
  '*': {
    disallow: ['/api'],
  },
};

module.exports.txt = (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  let ruleStr = '';
  for (var rule in rules) {
    ruleStr += 'User Agent: ' + rule + '\r\n';
    // eslint-disable-next-line
    if (rules[rule].disallow) {
      // eslint-disable-next-line
      for (let disallowRule of rules[rule].disallow) {
        ruleStr += 'Disallow: ' + disallowRule + '\r\n';
      }
    }
    // eslint-disable-next-line
    if (rules[rule].allow) {
      // eslint-disable-next-line
      for (let allowRule of rules[rule].allow) {
        ruleStr += 'Allow: ' + allowRule + '\r\n';
      }
    }
    ruleStr += '\r\n';
  }
  res.send(ruleStr);
};
