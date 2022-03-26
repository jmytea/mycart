const {model, SchemaTypes} = require('mongoose');

module.exports = model(
  'cart',
  {
    goodsID: String,
    goodsName: String,
    goodsImg: String,
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'user'
    },
    count: Number,
    selected: Object,
    selectedIDs: String,
    counterPrice: Number,
    retailPrice: Number,
    checked: {
      type: Boolean,
      default: false
    }
  }
)