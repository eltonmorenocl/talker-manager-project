const loginService = require('../services/login');

const generateToken = async (req, res) => {
  try {
      const token = await loginService.generateTokenService();
      return res.status(200).json({ token });
  } catch (error) {
      return res.status(500).json(error.message);
  }
};

module.exports = generateToken;