const express=require("express");
const router=express.Router();

const listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");

const {isLoggedIn,validateListing,isOwner}=require("../middleware.js");
const {storage}=require("../cloudconfig.js");
const listingController=require("../controllers/listing.js");
const multer  = require('multer')
const upload = multer({storage})


router
.route("/")
.get(wrapAsync(listingController.allListings)) //show all listings
.post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.newListing));//newOne




router.get("/new",isLoggedIn,(req,res)=>{
    res.render("listings/new.ejs");
})

//SHOW ROUTE >>
router.get("/:id",wrapAsync(listingController.showListing));


//EDIT ROUTE 
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing))


//UPDATE ROUTE : - getting put request from the edit ROute
router.put("/:id/update",isLoggedIn,upload.single('listing[image]'),isOwner,validateListing,wrapAsync(listingController.updateListing));


//delete route 
router.delete("/:id/delete",isLoggedIn,isOwner,wrapAsync(listingController.destroylisting));



router.get("/filter/:category", async (req, res) => {
    const { category } = req.params;

    const allListings = await listing.find({ category });
      if (allListings.length === 0) {
        req.flash("error", `No listings found in "${category}" category.`);
        return res.redirect("/listings");
    }
    
    res.render("listings/index", {allListings });
});


module.exports=router;