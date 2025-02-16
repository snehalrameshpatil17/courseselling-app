const express=require('express');
const {Router}=require('express');
const adminMiddleware=require("../middleware/admin");
const { Admin } = require('../db');
const { Course } = require('../db'); 

const router=express.Router();

router.post('/signup', async(req,res)=>{
    //implement admin signup page
    const username=req.body.username;
    const password=req.body.password;

    //check if user exist or not
     await Admin.create({
        username:username,
        password:password
    })
    
    res.json({
        message: 'admin created succesfully'
    })
})

router.post('/courses',adminMiddleware, async(req,res)=>{

    const title=req.body.title;
    const decription=req.body.description;
    const imageLink=req.body.imageLink;
    const price=req.body.price;

     const newcourse= await Course.create({
        title,
        decription,
        imageLink,
        price
    })
    console.log(newcourse)
    res.json({
        message: 'course created successfully',
        courseId: newcourse.id
    })
    

})

router.get('/courses',adminMiddleware,async(req,res)=>{
     const response= await Course.find({ })
     res.json({
        courses:response
     })


})

module.exports=router;


