const {model, SchemaTypes} = require('mongoose');

module.exports = model(
  'order',
  {
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'user'
    },
    orders: Array,
    pay: Number,
    
    // address: {
    //   type: SchemaTypes.ObjectId,
    //   ref: 'address'
    // },

    status: {
      type: Number,
      default: 0 //0:未付款，1:待发货，2:待收货，3:待评价，4:完成，5:取消订单
    }
    // 其他的字段：下单时间，发货时间，。。。。。。
  }
)