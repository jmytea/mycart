const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (error)=>{
  if(error){
    console.log('数据库连接失败');
  }else{
    //数据库连接成功
    const server = http.createServer(app);

    server.listen(8000, 'localhost', ()=>{
      console.log('run.....');
    })
  }
})
