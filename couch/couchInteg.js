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

const insert = ()=>{
    couch.uniqid().then((ids)=>{
        let id = ids[0];
        couch.insert(dbName,{
            _id:id,
            data:response
        })
    })
}


const mangoQuery = {
    selector: {
        "data.ApplicationDetail.ProductName": {
            "$eq": "Personal Jewelry Insurance Program"
         }
    }
};

const parameters = {}

const executeMangoQuery = ()=>{
    couch.mango(dbName,mangoQuery,parameters).then(({data,headers,status})=>{
        data.docs.map((doc)=>{
            console.log(doc.data)
        })
     })
}

let documentByGet = {}
const couchGet =  (documentByGet)=>{
     couch.get(dbName,"5f5f20343eecb61534791553e8001397").then(({data,headers,status})=>{
        documentByGet = data
        console.log(documentByGet)
       }).catch((err)=>console.log(err))
}

const couchUpdate = ()=>{
    
}
couchGet(documentByGet)


