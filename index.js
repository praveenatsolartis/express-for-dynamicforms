const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs')
const path = require('path');
const metadata = require('./metadata/metadata')
const app = express();


const allowCrossDomain = (req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}



app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(allowCrossDomain);

app.get('/getPages/getInsuredPage',(req,res)=>{
    fs.readFile(path.join(__dirname,'Insured_Response.json'),'utf-8',(err,content)=>{
        res.json(JSON.parse(content));
     })
})
app.get('/getPages/getAddnInformation', (req, res) => {
    fs.readFile(path.join(__dirname,'AdditionalInformation.json'),'utf-8',(err,content)=>{
        res.json(JSON.parse(content));
     })
});

app.get('/getPages/getAddnInsured', (req, res) => {
    fs.readFile(path.join(__dirname,'AdditionalInsured.json'),'utf-8',(err,content)=>{
        res.json(JSON.parse(content));
     })
});

app.get('/getPages/getAddnQuestions', (req, res) => {
    fs.readFile(path.join(__dirname,'ApplicationQuestions.json'),'utf-8',(err,content)=>{
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