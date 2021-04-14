const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name:String,
    email:String,
    gender:String,
    status:String,
    created_at:Date,
    updated_at:Date
});

schema.pre('save',function(next){
    var user = this;
    if (this.isNew) {
        user.status='Inactive';
        user.created_at = user.updated_at = Date.now();
    }
    else {
        user.updated_at = new Date.now();
    }
    return next();
});

const User = mongoose.model('User',schema);

module.exports = User;