const fs = require('fs')
const path = require('path');
exports.getData = (req,res)=>{

    const id = parseInt(req.params.reqId);

    if(id===1){
        fs.readFile(path.join(__dirname,'Insured_Response.json'),'utf-8',(err,content)=>{
            res.json(JSON.parse(content));
         })
    }  if(id===2){
        fs.readFile(path.join(__dirname,'AdditionalInsured_Response.json'),'utf-8',(err,content)=>{
            res.json(JSON.parse(content));
         })
    }else{
        res.json('{msg:No app}')
    }
}

