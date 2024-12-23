const jwt=require('jsonwebtoken')
const bcrypt=require("bcryptjs");
const { default: mongoose } = require("mongoose");
const userSchema= new mongoose.Schema({
    name:String,
    password:{type:String,require:true},
    email:{type:String,lowercase:true,unique:true,require:true},
    adress:{city:String,
        street:String,
        number:Number
    },
    role:{type:String,enum:['director','user','guest']}
})
userSchema.pre('save',async function() {
 
    const newPass = await bcrypt.hash(this.password,8);
    this.password=newPass;
})

const User = mongoose.model('users', userSchema);
 module.exports.User = User; 

 module.exports.createToken=function(user){
    const key='secret';
    const token=jwt.sign({id:user._id,role:user.role},key);
    return token;
 }