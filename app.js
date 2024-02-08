const express = require('express');
const app = express();
const PORT = 8083
let mongoose = require('mongoose')
let bodyParser = require('body-parser')

app.use(express.json())
// app.use(bodyParser)

let userRoute = require('./route/user')
let companyRoute = require('./route/company')

mongoose.connect('mongodb://127.0.0.1:27017/springtaskdb').then(() => {
  console.log('successfully connected to database');
}).catch((err) => { console.log('error connectinng to database: ', err); })

app.use(userRoute)
app.use(companyRoute)

app.listen(PORT, () => {
  console.log('Successfully connected to port: ', PORT);
})