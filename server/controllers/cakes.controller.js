const CakesSchema = require('../models/cakes.model');

const getCakes = async (req, res) => {
  try {
    const cakes = await CakesSchema.find();
    return res.status(200).json({
      success: true,
      count: cakes.length,
      data: cakes
    });
  } catch (err) {
    return res.send(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

const deleteCake = async (req, res) => {
  res.send('Delete :)');
};

module.exports = { getCakes, deleteCake };