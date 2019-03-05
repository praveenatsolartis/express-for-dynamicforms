const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs')
const path = require('path');
const metadata = require('./metadata/metadata')
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/getPages/getInsuredPage',(req,res)=>{
    fs.readFile(path.join(__dirname,'Insured_Response.json'),'utf-8',(err,content)=>{
        res.json(JSON.parse(content));
     })
})
app.get('/getPages/getAddnInsured', (req, res) => {
    fs.readFile(path.join(__dirname,'AdditionalInsured_Response.json'),'utf-8',(err,content)=>{
        res.json(JSON.parse(content));
     })
});

app.get('/getPages',(req,res)=>{
    fs.readFile(path.join(__dirname,'getPages.json'),'utf-8',(err,content)=>{
        res.json(JSON.parse(content));
     })
})



app.listen(5500, () => {
    console.log("Server is listening on port 5500");
});