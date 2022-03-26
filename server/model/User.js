const {model} = require('mongoose');

module.exports = model('user', {
  tel: {
    type: String,
    required: true
  }
});