require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const bodyParser = require("body-parser");
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

app.use(express.json());


// //routes
// app.use(require('./routes/auth'));

const port = process.env.PORT || 3000;
const mongoose = require('mongoose');


const Schema = mongoose.Schema;

// const expressLayouts = require('express-ejs-layouts');

const multer = require('multer');
const { log } = require('console');



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

app.use(session({
    secret: 'our secrets.',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
/* -------------------- mongodb setup ------------------- */
mongoose.connect('mongodb+srv://SRV1030:qwerty1234@cluster0.gje6l.mongodb.net/vaidyaDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.set("useCreateIndex", true);

//models
require('./models/hospital');
require('./models/dr');

//creating model for hospital and doctor
const Hospital = mongoose.model('Hospital');
const dr = mongoose.model('Doctor');

app.get("/index", (req, res) => {
    if (req.isAuthenticated()) {
        Hospital.find({}, (err, hosp) => {
            if (err) console.log(err);
            else {
                // console.log(hosp);
                res.render("index");
            }

        })
    } else {
        res.render("auth");
    }

})


app.route("/hospForm")
    .get((req, res) => {
        if (req.isAuthenticated()) {
            Hospital.find({}, (err, hosp) => {
                if (err) console.log(err);
                else {
                    res.render("hospForm");
                }

            })
        } else {
            res.render("auth");
        }

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
    res.redirect("/hospital");


})

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});

//User Authentication set-up


const userSchema = new mongoose.Schema({
    userSchema: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
})
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.route("/hospital")
    .get((req, res) => {
        if (req.isAuthenticated()) {
            Hospital.find({}, (err, hosp) => {
                if (err) console.log(err);
                else {
                    // console.log(hosp);
                    res.render("hospital", {
                        hosp: hosp,
                    });
                }

            })
        } else {
            res.redirect("/");
        }

    })


app.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        Hospital.find({}, (err, hosp) => {
            if (err) console.log(err);
            else {
                // console.log(hosp);
                res.redirect("/index");
            }

        })
    } else {
        res.render("auth");
    }
})
app.get("/ambulance", (req, res) => {
    res.render("ambulance")
})
let f1 = true;
app.get("/login", (req, res) => {
    f1 = !f1
    res.render("login", {
        f: f1,
    });

})
app.get("/register", (req, res) => {

    const f = false;
    res.render("register", {
        f: f,
    });

})
app.post('/register', (req, res) => {
    User.register({ username: req.body.username, name: req.body.name, email: req.body.email }, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            const f = true;
            res.render("register", {
                f: f,
            });
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/index")
            })
        }
    })
});
app.post('/login', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    });
    req.login(user, (err) => {

        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local", { failureRedirect: '/login' })(req, res, () => {
                res.redirect("/index");

            })
        }
    })
})

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
})