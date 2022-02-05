'use strict';

const express = require('express');

const PORT = process.env.PORT || 8080;

const app = express();

app.get('/',(req,res) => {
    res.send('Hello, my otus 2022');
});

app.get('/secret',(req,res) => {
    res.send('secret!!!');
});

app.get('/rn', (req,res) => {
    res.type("text/plain");
    let random = Math.random();
    res.send(random.toString())
});

app.listen(PORT)
console.log(`my port run: ${PORT}`)