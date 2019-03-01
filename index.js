const express = require('express');
const bodyParser = require('body-parser');
const metadata = require('./metadata/metadata')
// create express app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/getPages',(req,res)=>{
    res.json('{no_of_pages:2}')
})
app.get('/getPages/:reqId', (req, res) => {
    metadata.getData(req,res)
});



app.listen(5500, () => {
    console.log("Server is listening on port 5500");
});