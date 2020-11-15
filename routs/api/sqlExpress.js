const express = require('express');
/* define router */
const sqlParent = express.Router();
const bodyParser = require('body-parser');
/* adding mysql package */
const mysql = require('mysql');

/* bodyParser is used for recognizing data type. */
sqlParent.use(bodyParser.json());

sqlParent.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

// ---------------------------
/* test the middleware */
// ---------------------------
sqlParent.get("/firstEps", (req, resp, next) => {
    resp.send("<h2>now you are on sql root</h2>");
    next();
});


// ---------------------------
/* creat a connection */
// ---------------------------
//const pool = mysql.createPool({
//    connectionLimit: 10,
//    
//});

function connectFunc() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'hamidNode',
        pass: '',
        database: 'usersnode'
    });
    return connection;
}


// ---------------------------
/* calling users by their "id" */
// ---------------------------
sqlParent.get("/user/:id", function(req, resp, next) {
   
    const connection = connectFunc();
    
    // start connection
    connection.connect();
    
    const idQuery = req.params.id;
    const queryStr = "SELECT * FROM users WHERE id = ?"
    connection.query(queryStr, [idQuery], (err, rows, fields) => {
        // showing error in terminal
        if (err) {
            resp.sendStatus(500);
            throw err;
        }
        resp.json(rows);
    });
    
    connection.end();
}); // end "user/:id" request


// ---------------------------
/* add user from "form.html" file */
// ---------------------------
sqlParent.post('/addMember', function(req, resp, next) {
    console.log("we are adding members ...");
    let first = req.body.fName2;
    console.log(first);
    let second = req.body.lName2;
    
    const connection = connectFunc();
    const queryStr = "INSERT INTO users (firstName, secondName) VALUES (?, ?)";
    
    connection.connect();
    
    connection.query(queryStr, [first, second], (err, rows, fields) => {
        if (err) {
            resp.sendStatus(500);
            throw err;
        }
        resp.send("added successfuly");
    });
    
    connection.end();
}); // end "addMember" request

module.exports = sqlParent; // when using Router() its enough to export the router variable (here the 'sqlParent' variable)