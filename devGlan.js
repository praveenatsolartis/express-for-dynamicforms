let axios = require('axios')
let URL = 'https://www.devglan.com/online-tools/aes-encryption'
let payload = {"textToEncrypt":"welcome1","secretKey":"3FCCB01F507E8EB0","mode":"ECB","keySize":"128","dataFormat":"Base64"}
let headers = {
    headers:{
        'content-type': 'multipart/form-data;',
        'accept':'application/json, text/plain, */*',
        'accept-encoding':'gzip, deflate, br',
        'accept-language':'en-US,en;q=0.9,ta;q=0.8',
        'cookie':'_ga=GA1.2.618226230.1554105489; JSESSIONID=2E7342F5BB4A335603495EA1352868E9; _gid=GA1.2.216278110.1555056530',
        'origin':'https://www.devglan.com',
        'referrer':'https://www.devglan.com/online-tools/aes-encryption'
    }
}

axios.post(URL,payload,headers).then(res=>console.log(res.data))


//const postData = {"textToEncrypt":"welcome1","secretKey":"3FCCB01F507E8EB0","mode":"ECB","keySize":"128","dataFormat":"Base64"}
 

 /* fetch('https://www.devglan.com/online-tools/aes-encryption',{

 method: 'POST',

 headers: {

 'content-type': 'multipart/form-data;',

 'accept':'application/json, text/plain, *\/*',

 'accept-encoding':'gzip, deflate, br',

 'accept-language':'en-US,en;q=0.9,ta;q=0.8',

 'cookie':'_ga=GA1.2.618226230.1554105489; JSESSIONID=2E7342F5BB4A335603495EA1352868E9; _gid=GA1.2.216278110.1555056530',

 'origin':'https://www.devglan.com'

 },

 body: JSON.stringify(postData)

 }).then(res => res.json()).then(post => {

 console.log(post);

 this.setState({

 data: post

 })

 });
 */

const obj = {
    "data.data" : "praveen"
}

