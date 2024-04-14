const mongoose=require('mongoose');
const schema=mongoose.Schema({
    Name:String,
    ID:Number,
    Position:String,
    Location:String,
    Salary:Number,
    Username:String,
    Password:String,   
});
const empModel=mongoose.model('employee',schema);
module.exports=empModel;