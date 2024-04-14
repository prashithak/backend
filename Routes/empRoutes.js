const express=require('express');
const router=express.Router();
const emp=require('../model/employees');
const jwt=require('jsonwebtoken');

router.use(express.json());
 function verifytoken(req,res,next){
const token=req.headers.token;
   try{
       
        if(!token) throw 'unauthorized access';
        let payload=jwt.verify(token,'employeeapp');
        if(!payload) throw 'unauthorized access';
        next();
        }
        catch(error){
    res.status(404).send('caught in error');
        }
    }




//To create add employee
router.post('/',verifytoken,async(req,res)=>{
    try {
        const data=req.body;
        let newEmp=await emp(data).save();
        console.log(newEmp);
        res.status(200).send({message:"data added"})
    } catch (error) {
        console.log(error);
    }
})


// route for login
router.post('/login',verifytoken,async(req,res)=>{
    let Username=req.body.Username;
    let Password=req.body.Password;
    const Emp=await emp.findOne({Username:Username});
   
    if(!Emp){
        res.json({message:"user not found"});
            }
    try {
        if(Emp.Password==Password){
            let payload={user:Username,pwd:Password}
            let token=jwt.sign(payload,'employeeapp');
            res.send({message:"login successfully",token:token});
        }
        else{
            res.json({message:"login failed"});
        }
         }
    catch (error) {
        console.log(error);
    }
})

//To display employees(get operation)

router.get('/view' ,verifytoken,async(req,res)=>{
    emp.find()
    .then((data)=>{res.json(data);})
    .catch((err)=>{console.log(err);})
})

//to delete an employee

router.delete('/del/:id',async(req,res)=>{
    try {
       let id=req.params.id;
       await emp.findByIdAndDelete(id);
       res.status(200).send({message:"employee deleted"}) 
    } catch (error) {
        console.log(error);
    }
})
//to update an employee
router.put('/up/:id',async(req,res)=>{
    try {
       let id=req.params.id;
       let up=await emp.findByIdAndUpdate(id,req.body) ;
       res.status(200).send({message:"updated successfully"})
    } catch (error) {
        res.status(404).send('update not working');
        
    }
})




module.exports=router;