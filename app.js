const express = require("express");
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const {MONGOURI} = require("./key");



mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=>{
    console.log("connection is successful")
}).catch((e)=>{
    console.log("connnection is failed"+e);
})


 require("./models/user")
 require("./models/post")

app.use(express.json());
app.use (require("./routes/auth"))
app.use(require("./routes/post"))
app.use(require("./routes/user"))



 
app.listen(PORT, ()=>{
    console.log(`server run oon the  ${PORT}`);
})
