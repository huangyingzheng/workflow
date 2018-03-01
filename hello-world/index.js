const express = require('express');
const app= express();//产生app物件
app.get("/",function(req,res){
    res.send('Hellow<b>World<b>');
})// 斜线相当于根目录,当连线到根目录是做出回应
app.get("/mypath",function(req,res){
    res.send('this is my path')
})
app.listen(3000,function(){
    console.log('lancher successful http:// localhost:3000/');
})//listen启动服务器