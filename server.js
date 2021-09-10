const express = require('express');
const path=require('path');

const app=express();

app.use(express.static('./dist/Client-A'));


app.get('/*',(req,res)=>res.sendFile('index.html',{root:'dist/Cliente-A/'}),);
app.listen(process.env.PORT||8080)