const { response } = require('express');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const mongoose = require('mongoose');
const User = require('./schema/User');

mongoose.connect('mongodb+srv://deepak:D33p!@cluster0.i4nsj.mongodb.net/TensorGo?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify:false
}, () => {
    console.log("connected to db");
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get('/', (req, res) => {
    res.send("APP is Running");
});

app.get('/users', async (req, res) => {
    const user = new User();
    let userslist = await User.find().exec();
    if (userslist) {
        res.status(200).json(userslist);
    }else{
        res.status(422).json({"error":"not able to users list"})
    }
});

app.get('/user/:id', (req, res) => {
    const { id } = req.params;
    User.findById(id).then(response=>{
        res.status(200).json(response);
    }).catch(err=>{
        res.status(422).json({error:err.message});
    });
});

app.delete('/user/:id',(req,res)=>{
    const { id } = req.params;
    User.findByIdAndDelete(id).then(result=>{
        res.status(200).json({id:result.id});
    }).catch(err=>{
        res.status(200).json({error:err.message});
    })
});

app.post('/user', (req, res) => {
    console.log("body of user" + req.body);
    const { name, email, gender } = req.body;
    const user = new User({ name, email, gender });
    user.save().then(response => {
        res.status(200).json(response);
    }).catch(err => {
        res.status(422).json(err.message);
    });
});

app.put('/user/:id',(req,res)=>{
    const { id } = req.params;
    const payload = req.body;
    User.findByIdAndUpdate(id,payload).then(result=>{
        return res.status(200).send(result.id)
    }).catch(err=>{
        return res.status(422).send("Error in updatilng user");
    })
});

const port = process.env.PORT || 4444;

app.listen(port, () => {
    console.log(`app is running on port ${port}`)
});