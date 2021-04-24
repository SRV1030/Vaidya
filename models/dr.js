const mongoose = require('mongoose');



const Schema = mongoose.Schema;

//creating doctor schema
const drProfileSchema = new Schema({
    drName: String,
    drDegree: {
        type: String
    },
    fieldexpertise: {
        type: String
    },
    workAddress: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    workExp: {
        type: String
    },
    img: {
        data: Buffer,
        type: String,
    },
    desc: String,
}, { typeKey: '$type' });

mongoose.model('Doctor', drProfileSchema);