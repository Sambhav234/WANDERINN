const express=require("express");
const router=express.Router();

router.get("/",(req,res)=>{
    res.send("USers route working fine");
})

router.get("/:id",(req,res)=>{
   let {id}=req.params;
    res.send(`Searching for User with id : ${id}`);
})


module.exports=router;