require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const expressLayouts = require('express-ejs-layouts');

const multer = require('multer');

//for image storage
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage });

app.set('view engine', 'ejs');

app.use('/static', express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];

/* -------------------- mongodb setup ------------------- */
mongoose.connect('mongodb+srv://SRV1030:qwerty1234@cluster0.gje6l.mongodb.net/vaidyaDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//creating items schema
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

//creating thrift store schema
const hospitalSchema = new Schema({
    hospitalName: String,
    hospitalAddress: String,
    bedAvilabile: String,
    workForce: String,
    specialization: String,
    facilities: String,
    imgH: {
        data: Buffer,
        type: String,
    },
    desc: String,
}, { typeKey: '$type' });

//creating model for thrift store
const Hospital = mongoose.model('Hospital', hospitalSchema);
const dr = mongoose.model('Doctor', drProfileSchema);
app.route("/")
    .get((req, res) => {
        Hospital.find({}, (err, hosp) => {
            // console.log(store);
            res.render("hospital", {
                hosp: hosp,
            });

        })

    })

// app.route("/myStore")
//     .get((req, res) => {
//         Item.find({}, (err, items) => {
//             res.render("myStore", {
//                 items: items,
//             });
//         })

//     });


// app.route("/storeRegister")
//     .get((req, res) => {
//         res.render("storeRegister");
//     })
//     .post((req, res) => {
//         const store = new ThriftStore({
//             storeName: req.body.storeName,
//             storeEmail: req.body.storeEmail,
//             storePhone: req.body.storePhone,
//             storeAddress: req.body.storeAddress,
//             storeInfo: req.body.storeInfo
//         })
//         store.save();
//         res.redirect("/");
//     });
app.route("/hospForm")
    .get((req, res) => {
        res.render("hospForm");
    })
app.post("/hospForm", upload.single('itemImage'), (req, res) => {

    let item = new Hospital({
        hospitalName: req.body.hospName,
        hospitalAddress: req.body.hospAd,
        bedAvilabile: req.body.bed,
        workForce: req.body.workForce,
        specialization: req.body.spec,
        facilities: req.body.desc,
        imgH: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            type: 'image/jpg',
        },

    });
    // console.log(item);
    item.save();
    res.redirect("/");


})

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});