const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const Json2csvParser = require('json2csv').Parser;
const DateTime = require('date-and-time');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const User = require('./schema/User');

mongoose.connect('mongodb+srv://deepak:D33p!@cluster0.i4nsj.mongodb.net/TensorGo?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}, () => {
    console.log("connected to db");
});


app.get('/fetch/user', (req, res) => {

    axios.get('https://gorest.co.in/public-api/users')
        .then(result => {
            let data = result.data.data;
            User.insertMany(data)
                .then(result => {
                    res.status(200).json({ data: data });
                }).catch(err => {
                    res.status(422).send(err.message);
                });
        }).catch(err=>{
            res.status(422).send("Error while fetching data form API");
        });
});

const port = process.env.PORT || 2222
app.listen(port, () => {
    console.log(`fetch service running on${port}`);
});