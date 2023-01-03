const crypto = require('crypto');

const generateTokenService = async () => crypto.randomBytes(8).toString('hex');

module.exports = { generateTokenService };