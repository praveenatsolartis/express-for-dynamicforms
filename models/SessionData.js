const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionDataSchema = new Schema({
    session_id:{
        type: String,
        required:true,
        unique:true
    },
    pageData:{
        type:Array
    },
    createdDate:{
        type:Date,
        default:Date.now
    }
})

module.exports = SessionData = mongoose.model('SessionData',SessionDataSchema)