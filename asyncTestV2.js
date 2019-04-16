const axios = require('axios')
const tree_api_request = require('./tree')
const metadataRequest = require('./metadataRequest')
const crypto = require('crypto')
require('dotenv').config()

var payload = JSON.parse(JSON.stringify(tree_api_request))
var metaDataPayload = JSON.parse(JSON.stringify(metadataRequest))


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


const invokeMetaData = (token,payload,tree)=>{
    let metaDataHeader = {
        headers:{
            "Content-Type":"application/json",
            "Environment":"15",
            "MODE":"LIVE",
            "Token":token
        }
    }
    payload.ServiceRequestDetail.Token = token;
    tree.data.map(async page=>{
        let pageName = page.name;
        let metaDataRequest = payload;
        let applicationType = page.navigationParams.applicationType;
        let applicationObjectName = page.navigationParams.applicationObjectName;
        let subApplicationType = page.navigationParams.subApplicationType;
        let subApplicationName = page.navigationParams.subApplicationName;

        metaDataRequest.ObjectName = applicationObjectName;
        metaDataRequest.ApplicationType = applicationType;
        metaDataRequest.SubApplicationType = subApplicationType;
        metaDataRequest.SubApplicationNameList = []
        metaDataRequest.SubApplicationNameList.push({"SubApplicationName":subApplicationName})
        await axios.post('https://uciapplicationservice.solartis.net/ApplicationServiceV5/ApplicationService5/getMetaDataV2',metaDataRequest,metaDataHeader)
        .then(res=>{console.log(`Page name is ${pageName} and result is`+'%o',res.data.ApplicationDetail.SubApplicationDetailList[0].AttributeDetailList)})
        .catch(err=>console.log(err))
    })
}
const invokeTree =  (token,payload)=>{
    let treeHeader = {
            headers:{
                'Content-Type':'application/json',
                'Token':token,
                'EventName':'GetUINavigationTreeV1',
                'MODE':'LIVE',
                'Environment':'15'
            }
    }
    payload.ServiceRequestDetail.Token = token;
     axios.post('https://ucicomruntimev6-2.solartis.net/KnowledgeEngineV6_2/KnowledgeBase/FireEventV2',payload,treeHeader).then(res=>{
        invokeMetaData(token,metaDataPayload,res.data)
     }).catch(err=>console.log(err))
}


const authInvoke = async ()=>{
    await axios.post('https://ucicommonservice.solartis.net/CommonServiceV2_1/AuthenticationServiceV2/requestService',authPayload,authConfig).then(response=>{
        const token = response.data.Token;
        payload.ServiceRequestDetail.Token = token;
        invokeTree(token,payload)
    }).catch(err=>console.log(err))
}

authInvoke()


const passwordEncryptor = ()=>{
    let password = 'welcome1'
    let KEY = '3FCCB01F507E8EB0'
    const cipher = crypto.createCipher('aes128', KEY);
    var encrypted = cipher.update(password,'utf8', 'base64');
    encrypted += cipher.final('base64');
    console.log(encrypted)
}

passwordEncryptor()
