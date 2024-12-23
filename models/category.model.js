const { default: mongoose } = require("mongoose");


// const bcrypt=require("bcryptjs")
const categorySchema = new mongoose.Schema({
    name: String,
    numOfReciepes:Number
});
const Category=mongoose.model('categories',categorySchema);
module.exports=Category;