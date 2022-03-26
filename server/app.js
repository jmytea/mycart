const express = require("express");

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use((req, res, next)=>{
  if(!req.xhr && req.method !== 'GET'){
    let tmp = '';
    req.on('data', (bf)=>{
      tmp += bf;
    })
    req.on('end', ()=>{
      req.fetchBody = JSON.parse(tmp);
      next();
    })
  }else{
    next();
  }
})

app.use("/api/goods", require("./routers/goodsRouter"));
app.use("/api/user", require("./routers/userRouter"));
app.use("/api/cart", require("./routers/cartRouter"));
app.use("/api/order", require("./routers/orderRouter"));


module.exports = app;
