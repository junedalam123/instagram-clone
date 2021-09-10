const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
      email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        pic:{
          type:String,
          dafault:"https://res.cloudinary.com/dnrklsoul/image/upload/v1628962522/noimagee_ffxpyw.jpg"
        },
        followers:[{type:ObjectId,ref:"User"}],
        following:[{type:ObjectId,ref:"User"}]

})

 mongoose.model("User",userSchema)
