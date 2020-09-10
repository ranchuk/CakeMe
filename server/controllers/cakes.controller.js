const CakeSchema = require('../models/cake.model');

const getCakes = async (req, res) => {
  try {
    const cakes = await CakeSchema.find();
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

const getCake = async (req, res) => {
  const { id } = req.params;
  try {
    const cake = await CakeSchema.findById(id);
    return res.status(200).json({
      success: true,
      data: cake
    });
  } catch (err) {
    return res.send(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

const addCake = async (req, res, next) => {
  try {
    const { name, price, image } = req.body;

    const cake = await CakeSchema.create(req.body);

    return res.status(200).json({
      success: true,
      data: cake
    });
  } catch (err) {
    if (err.name === 'ValidationError' || err.price === 'ValidationError' || err.image === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};

const deleteCake = async (req, res) => {
  try {
    const cake = await CakeSchema.findById(req.params.id);

    if (!cake) {
      return res.status(404).json({
        success: false,
        error: 'No Cake Found!'
      });
    }

    await cake.remove();

    return res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

module.exports = { getCakes, getCake, addCake, deleteCake };