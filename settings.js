module.exports.debug = true;
module.exports.passwordPolicy = {
  pMinLength: 15,
  pMaxLength: 128,
  pAlpha: true,
  pUppercase: false,
  pLowercase: false,
  pDigits: false,
};
module.exports.lockoutCount = 10;
module.exports.backend = 'localhost:3100';
