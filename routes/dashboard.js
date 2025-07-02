const express=require("express");
const router=express.Router();
const listing=require('../models/listing.js');

const Booking=require('../models/booking.js');
const wrapAsync=require("../utils/wrapAsync.js");
const User=require("../models/user.js");
const {validateBooking, isLoggedIn}=require("../middleware.js");
const {cloudinary}=require("../cloudconfig.js");
const {storage}=require("../cloudconfig.js");
const multer  = require('multer')
const upload = multer({storage})


router.get('/dashboard',isLoggedIn,async (req,res)=>{
  const bookings=await Booking.find({user:req.user._id}).populate('listing');
  res.render('listings/dashboard.ejs',{user:req.user,bookings});
})


router.get('/dashboard/updateprofile',async(req,res)=>{
  res.render("users/update.ejs",{user:req.user});
});


router.post("/dashboard/user/updateprofile",isLoggedIn,upload.single('profileImage'),wrapAsync(async(req,res)=>{
    const user=await User.findById(req.user._id);

    if(user.profileImage.filename){
        await cloudinary.uploader.destroy(user.profileImage.filename);
    }

    user.profileImage = {
      url: req.file.path,
      filename: req.file.filename
    };

    await user.save();
    req.flash('success', 'Profile picture updated successfully!');
    res.redirect('/dashboard');

}))

router.post("/dashboard/user/resetprofile",isLoggedIn,wrapAsync(async(req,res)=>{
    const user=await User.findById(req.user._id);

    if(user.profileImage.filename){
        await cloudinary.uploader.destroy(user.profileImage.filename);
    }

    user.profileImage = {
      url: "/uploads/user.png",
      filename: ''
    };

    await user.save();
    req.flash('success', 'Profile picture has been reset to default successfully');
    res.redirect('/dashboard');

}))

module.exports=router;