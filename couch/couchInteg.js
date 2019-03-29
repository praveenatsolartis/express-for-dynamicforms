const NodeCouchDb = require('node-couchdb')
const response = require('./response')
const couch = new NodeCouchDb({
    auth:{
        user:'solartis',
        password:'solartis'
    },
    host: '10.100.16.25',
    port:'5984'
})

const dbName = 'couch_nodejs'

couch.get(dbName,"5f5f20343eecb61534791553e8001397").then(({data,headers,status})=>{
 // console.log(data)
 // console.log(headers)
  //console.log(status)
})

couch.uniqid().then((ids)=>{
    let id = ids[0];
    couch.insert(dbName,{
        _id:id,
        data:response
    })
})


