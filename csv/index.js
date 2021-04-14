const express = require('express');
const mongoose = require('mongoose');
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

app.get('/user/csv', async (req, res) => {

    let result = await User.find();
    const csvFields = ['Id', 'Name', 'Email', 'gender', 'Status', 'Created At', 'Updated At'];
    let json = [];
    result.forEach(rs => {
        json.push({
             id: rs.id,
             name: rs.name,
             email: rs.email,
             gender: rs.gender,
             status: rs.status,
             created_at: DateTime.format(rs.created_at,'DD/MM/YYYY hh:mm'),
             updated_at: DateTime.format(rs.updated_at,'DD/MM/YYYY hh:mm') 
        });
    });
    const json2csvParser = new Json2csvParser({ csvFields });
    const csvData = json2csvParser.parse(json);

    res.setHeader('Content-disposition', 'attachment; filename=users.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).end(csvData);
});

const port = process.env.PORT || 3333

app.listen(port, () => {
    console.log(`csv file service running on ${port}`);
});