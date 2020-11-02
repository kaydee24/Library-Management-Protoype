const express = require("express");
const mysql = require("mysql");
const dotenv=require('dotenv');
const path=require('path');

const app = express();

dotenv.config|({ path: './.env'});


//created a connection
const db=mysql.createConnection({

    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    port: 5001,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});

//homepage
const publicDirectory=path.join(__dirname, './public');

app.set('view engine' , 'hbs');

//use that css public dirtectory
app.use(express.static(publicDirectory));



//actual connection
db.connect((error)=>{

    if(error){
        console.log(error);

    }
    else{
        console.log("mysql connected");

    }
});


//now create tables in your sql
//define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

//taking form info, parsing url encoded bodies as sent by html file. It makes sure I grab data from form
app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.listen(5001, ()=>{

    console.log("started");
});