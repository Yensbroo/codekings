const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const acl = require('acl');
const bodyParser = require("body-parser");
const auth = require('./server/config/passport')();
const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
        destination: './public/uploads/',
        filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
});

//Init upload
const upload = multer({storage: storage}).single('avatar');

const routes = require("./server/routes");

const app = express();

// express middleware
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static(path.join(__dirname, 'client/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var corsOption = {
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        exposedHeaders: ['x-auth-token']
    };

app.use(cors(corsOption));

//DB config
const db = require("./server/config/keys").mongoURI;

// Connect to MongoDB
mongoose.connect(db)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log(err))


app.use(auth.initialize());

//Routes
app.use("", routes);


const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server running on port ${port}`));
