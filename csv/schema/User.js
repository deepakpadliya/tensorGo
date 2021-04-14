const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    id:{
        type:String,
        unique:true,
        require:true
    },
    name:String,
    email:String,
    gender:String,
    status:String,
    created_at:Date,
    updated_at:Date
});


const User = mongoose.model('User',schema);

module.exports = User;