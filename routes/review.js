const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const {validateReview,isLoggedIn,isAuthor}=require("../middleware.js");
const reviewController=require("../controllers/review.js");
//REVIEW 
//SAVING REVIEW IN DB
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.newReview));
//DELETING REVIEW ROUTE
//jab ham review delete kre to lisiting me se bhi review ht jae
router.delete("/:reviewID",isLoggedIn,isAuthor,wrapAsync(reviewController.deleteReview));


module.exports=router;