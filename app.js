const express=require('express');
const morgan=require('morgan');
const dotenv=require('dotenv').config();
require('./DB/connection');
const cors=require('cors');
const empRoutes=require('./Routes/empRoutes');


const PORT=process.env.PORT;
const app=express();
app.use(morgan('dev'));
app.use(cors());
app.use('/api',empRoutes);



app.listen(PORT,()=>{
    console.log(`${PORT} is up and running`);
})