const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs')
const path = require('path');
const metadata = require('./metadata/metadata')
const app = express();
const  Axios = require('axios');
const tree_payload = require('./tree')

let tree_request = tree_payload

const allowCrossDomain = (req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(allowCrossDomain);

let authConfig = {
    headers:{
        "Content-Type":"application/json"
    }
}

let authPayload = {
    "ServiceRequestDetail": {
      "ServiceRequestVersion": "2.0",
      "OwnerId": "41",
      "BrowserIp": "192.168.74.31",
      "ResponseType": "json"
    },
    "UserCredential": {
      "UserName": "britecoagent",
      "Password": "sKVSbX7wj8UYYAaar4amxQ=="
    }
}
let treeHeader = {
    headers:{
        'Content-Type':'application/json',
        'Token':'',
        'EventName':'GetUINavigationTreeV1',
        'MODE':'LIVE',
        'Environment':'15'
    }
}

let authURL = 'https://ucicommonservice.solartis.net/CommonServiceV2_1/AuthenticationServiceV2/requestService'
let treeURL = 'https://ucicomruntimev6-2.solartis.net/KnowledgeEngineV6_2/KnowledgeBase/FireEventV2'

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

app.get('/getTree',async (request,response)=>{
   await invokeTree().then(
       res=>{
        response.json(res.data)
       }
   )
})

const invokeTree = ()=>{
    return new Promise(async (resolve,reject)=>{
        await Axios.post(authURL,authPayload,authConfig)
        .then(
           (authResponse)=>{
            const token = authResponse.data.Token;
            tree_request.ServiceRequestDetail.Token = token;
            treeHeader.headers.Token = token
                Axios.post(treeURL,tree_request,treeHeader).
                then((treeResponse)=>{
                        resolve({
                            data:treeResponse.data
                        })
                }).catch(err=>console.log(err))
           }
        )
        .catch(err=>reject({err}))
    })
}
app.listen(5500, () => {
    console.log("Server is listening on port 5500");
});