const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const acl = require('acl');
const bodyParser = require("body-parser");
const auth = require('./server/config/passport')();

const routes = require("./server/routes");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

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
