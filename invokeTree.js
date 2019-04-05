import Axios from "axios";
import tree_payload from './tree'

let tree_request = tree_payload

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
export const invokeTree = ()=>{
   let tree_response = '';
    Axios.post('https://ucicommonservice.solartis.net/CommonServiceV2_1/AuthenticationServiceV2/requestService',authPayload,authConfig).then(response=>{
    const token = response.data.Token;
    tree_request.ServiceRequestDetail.Token = token;
    treeHeader.headers.Token = token
    Axios.post('https://ucicomruntimev6-2.solartis.net/KnowledgeEngineV6_2/KnowledgeBase/FireEventV2',tree_request,treeHeader)
    .then(res=>{tree_response=res.data})
    .catch(err=>console.log(err))
}).catch(err=>console.log(err))
    return (dispatch)=>{
        dispatch({type:'INVOKE_TREE',payload:tree_response})
    }
}
