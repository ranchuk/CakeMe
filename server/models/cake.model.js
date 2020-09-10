var mongoose = require('mongoose');

var CakeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add name']
  },
  price: {
    type: Number,
    required: [true, 'Please add price']
  },
  image: {
    type: String,
    required: [true, 'Please add image']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Cake', CakeSchema);