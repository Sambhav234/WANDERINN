const express=require("express");
const router=express.Router({});
const User=require("../models/user.js");
const wrapAsync=require("../utils/wrapAsync.js");
const passport=require("passport");
const {savedredirectUrl}=require("../middleware.js");

const userController=require("../controllers/user.js");


router.route("/")
.get((req,res)=>{
    res.render("listings/home.ejs",{currUser: req.user||null});
})

router.route("/privacy")
.get((req,res)=>{
    res.render("listings/privacy.ejs",{currUser:req.user || null});
})

router.route('/terms')
.get((req,res)=>{
    res.render("listings/terms.ejs",{currUser:req.user || null});
})






router.route("/signup")
.get((req,res)=>{
    res.render("users/signup.ejs");
})
.post(wrapAsync(userController.signup));

//to combine requests with same path
router.route("/login")
.get(async (req,res)=>{
    res.render("users/login.ejs");
})
.post(savedredirectUrl,passport.authenticate('local',{failureRedirect:'/login',failureFlash:true}),wrapAsync(userController.login))


router.get("/logout",userController.logout)

module.exports=router;