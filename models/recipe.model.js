const { Types, default: mongoose } = require("mongoose");
const { User } = require("./user.model");



// const bcrypt=require("bcryptjs")
const recipeSchema = new mongoose.Schema({
    name: String,
    desription: String,
    category_id:{
    //   validate:{
    //     valdator:functio
    //    isAsync:true,

    //     },
      type:Types.ObjectId,
        ref:'categories'
    },
    minutesTime: Number,
    // role: { type: String, enum: ['admin', 'user'], default: 'user' } // 
    difficulty:{type: Number, Enum: [1, 2, 3, 4, 5]},
    addDate: { type: Date, default: new Date() },
    layers: [{
        desc: String,
        ingredient: String
        //ingredient:[String]
    }],
    instruction: String,
    //img:String,
    isPrivate: Boolean,
    user_id:{
        type:Types.ObjectId,
        ref:'users'
    }

});
const Recipe =mongoose.model('recipes',recipeSchema);
 module.exports=Recipe ;