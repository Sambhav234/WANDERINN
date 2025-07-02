const express=require("express");
const router=express.Router();
const listing=require('../models/listing.js');

const Booking=require('../models/booking.js');
const wrapAsync=require("../utils/wrapAsync.js");

const {validateBooking, isLoggedIn}=require("../middleware.js");

router.route('/bookings')
.post(validateBooking,wrapAsync(async(req,res)=>{
    const { name, email, phone, checkin, checkout, guests, message, listingId } = req.body;

  const checkInDate = new Date(checkin);
  const checkOutDate = new Date(checkout);

  const days = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

   const listings = await listing.findById(listingId);
  if (!listings) {
    return res.status(404).send('Listing not found');
  }

   const pricePerDay = listings.price; // assuming your Listing schema has this
  const totalAmount = pricePerDay * days*guests;

  

   req.session.tempbooking = {
    user:req.user._id,
    listing: listings._id,
    name,
    email,
    phone,
    checkin: checkInDate,
    checkout: checkOutDate,
    guests,
    message,
    totalAmount,
    days,
    currDate:new Date(),
  };

  //  await booking.save();

    // req.flash("success","Booking saved Successfully");



    res.redirect(`/bookings/payment`);
}));



router.get('/bookings/payment',wrapAsync(async (req,res)=>{
    const bookingData=req.session.tempbooking;
    const listingdata=await listing.findById(bookingData.listing);
    const booking = {
      ...bookingData,
      listing:listingdata
    }
    res.render('listings/payment.ejs',{booking});
}))


router.post('/bookings/payment/checkout',isLoggedIn,wrapAsync(async(req,res)=>{

  const bookd=req.session.tempbooking;
  const listd=await listing.findById(bookd.listing);

  const prefinalbooking={
    listing:listd,
    ...bookd
  }

  const finalbooking= new Booking(prefinalbooking);
  await finalbooking.save();

  req.flash("success","booking done successfully!!")
  res.render("listings/bookingsucess.ejs")

}))

router.delete('/bookings/:id/delete',wrapAsync(async (req,res)=>{
  const {id}=req.params;

  await Booking.findByIdAndDelete(id);
  req.flash("success","Booking cancelled successfully!");
  res.redirect('/dashboard');

}))

module.exports=router;