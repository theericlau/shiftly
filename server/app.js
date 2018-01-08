const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/dist/compiled'));


app.get(express.static(__dirname + '/../client/dist/compiled/favicon.ico'));


module.exports = app;