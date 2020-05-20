"use strict"; 

const express = require('express'); 
const path = require('path');
const app = express(); 


app.use(express.static(path.join(__dirname, './user-api/public/')))
app.set('views', path.join(__dirname, './user-api/public/'))

app.listen(process.env.PORT);