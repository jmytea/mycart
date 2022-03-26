const {model, SchemaTypes} = require('mongoose');

module.exports = model(
  'address',
  {
    user: '',
    name: '',
    tel: '',
    // 省份
    // 城市
    // 区域
    // 街道
    // 详细地址
    // 邮编
    main: true/false//默认的收货地址
  }
)
