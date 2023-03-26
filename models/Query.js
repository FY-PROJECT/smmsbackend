const mongoose = require('mongoose');
const {Schema} = mongoose;

const querySchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
    },
    message : {
        type : String,  
        required : true,
    },
    replied : {
        type : Boolean,
        default : false
    },
    reply : {
        type : String,
        default : null
    },
    date : {
        type : Date,
        default : Date.now
    }
  });

const Query = mongoose.model('Query', querySchema);
module.exports = Query; 