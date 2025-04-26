const review=require("../models/reviews.js");

const listing=require("../models/listing.js");

module.exports.newReview=async (req,res)=>{
    const { id }=req.params;
  
    const list=await listing.findById(id);
    const newreview=new review(req.body.Review);
    newreview.author=req.user._id;
  

    list.reviews.push(newreview);
    await newreview.save();
    await list.save();

    req.flash("success","New Review added successfully !!")
    console.log("Review Saved In DB")
    res.redirect(`/listings/${id}`);
}


module.exports.deleteReview=async(req,res,next)=>{
    const {id,reviewID}=req.params;
    await listing.findByIdAndUpdate(id,{$pull : {reviews:reviewID}});
    await review.findByIdAndDelete(reviewID);
    req.flash("success","Review deleted successfully !!")

    res.redirect(`/listings/${id}`);

}