const mongoose = require('mongoose');
const {Schema} = mongoose;

const trainerSchema = new Schema({
    bsgid : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    emailId : {
        type : String,
    },
    dob : {
        type : String,
        required : true
    },
    aadharNo:{
        type : Number,
    },
    state:{
        type : String,
    },
    unit : {
        type : String,
        required : true
    },
    category : {
        type : String,
        default : "Trainer"
    },
    post:{
        type : String,
    },
    certificateNo : {
        type : String,
        required : true
    },
    certificateDate : {
        type : String,
        required : true
    },
    honrableChargeNo:{
        type : String,
        required : true
    },
    honrableChargeDate:{
        type : String,
        required : true
    },
    certificateValidity : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    },
    
  });

const Trainer = mongoose.model('Trainers', trainerSchema);

module.exports = Trainer; 