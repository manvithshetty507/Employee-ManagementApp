const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcyrpt = require('bcrypt');

const userSchema = new Schema({
    username:{
        type:String,
        require:true,
        unique:[true,"The username is already in use"]
    },
    password:{
        type:String,
        require:true,
    }
},{ collection: 'users' })

userSchema.pre('save', async function(next) {
    if(this.isModified('password') || this.isNew) {
        try {
            const salt = await bcyrpt.genSalt(10);
            this.password = await bcyrpt.hash(this.password, salt);
            next();
        }catch(err) {
            next(err)
        }
    }else {
        return next();
    }
},)

const User = mongoose.model('User',userSchema);

module.exports = User;