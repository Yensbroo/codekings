const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const acl = require('acl');
const bodyParser = require("body-parser");
const auth = require('./config/passport')();
const multer = require('multer');
const path = require('path');

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
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose.connect(db)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log(err))


app.use(auth.initialize());

//Routes
app.use("", routes);

if(process.env.NODE_ENV === 'production') {
        app.use(express.static('client/build'));

        app.get('*', (req, res) => {
                res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        })
}


const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server running on port ${port}`));
