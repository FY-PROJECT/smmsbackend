const mongoose = require('mongoose');
const {Schema} = mongoose;

const trainerSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    dob : {
        type : String,
        required : true
    },
    category : {
        type : String,
        default : "trainer"
    },
    date : {
        type : Date,
        default : Date.now
    },
    bsgid : {
        type : String,
        required : true
    },
    unit : {
        type : String,
        required : true
    },
    post:{
        type : String,
    }
  });

const Trainer = mongoose.model('Trainers', trainerSchema);

module.exports = Trainer; 