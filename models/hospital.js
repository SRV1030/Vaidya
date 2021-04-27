const mongoose = require('mongoose');
//creating hospital store schema
const Schema = mongoose.Schema;
const hospitalSchema = new Schema({
    hospitalName: String,
    hospitalAddress: String,
    bedAvilabile: String,
    workForce: String,
    specialization: String,
    facilities: String,
    username: String,
    imgH: {
        data: Buffer,
        type: String,
    },
    desc: String,
}, { typeKey: '$type' });
mongoose.model('Hospital', hospitalSchema);