const mongoose=require('mongoose');



mongoose.connect(process.env.mongoDB_URL).then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);

})