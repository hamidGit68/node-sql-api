const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
// Use Helmet to protect against well known vulnerabilities, for online sites
const helmet = require('helmet');
// Use gzip/deflate compression for responses
const compression = require('compression');

app.use(compression()); 
app.use(helmet());
// calling the rout file with the "use" method
app.use('/api', require('./routs/api/createMember.js'));
app.use('/sql', require('./routs/api/sqlExpress.js'));

// you can also use "app.route()" method for handling routes

/* bodyParser is used for recognizing data type. */
app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

/* static files */
app.use(express.static("./public"));


const portNum = process.env.PORT || 5000;

app.listen(portNum, () => console.log(`server is runnig at port ${portNum}`));
