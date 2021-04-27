const mongoose = require('mongoose');



const Schema = mongoose.Schema;

//creating doctor schema
const drProfileSchema = new Schema({
    drName: String,
    drDegree: String,
    fieldexpertise: String,
    workAddress: String,
    email: String,
    phone: String,
    workExp: String,
    username: String,
    img: {
        data: Buffer,
        type: String,
    },
    desc: String,
}, { typeKey: '$type' });

mongoose.model('Doctor', drProfileSchema);