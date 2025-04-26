const express=require("express");
const router=express.Router();




router.get("/",(req,res)=>{
    res.send("Post route working fine");
})


router.get("/:id",(req,res)=>{      // it means /posts/:id but since we have given /posts in server.js so full not used.
    let {id}=req.params;
    res.send(`Searching for post with id : ${id}`);
})



module.exports=router;