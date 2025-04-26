
const listing=require("../models/listing.js");
const {listingSchema}=require("../schema.js")

module.exports.allListings=async (req,res)=>{
    const allListings=await listing.find({});
    
 

    res.render("listings/index.ejs",{allListings});
};


module.exports.showListing=async (req,res)=>{
    const {id}=req.params;
    const listings=await  listing.findById(id).populate({
        path:"reviews",
        populate:{
            path:"author",
        },

    }).populate("owner");
    if(!listings){
        req.flash("error","Listing you are trying to access does not Exist");
        res.redirect("/listings");
    }else{
    res.render("listings/show.ejs",{listings})
    }
}



module.exports.destroylisting=async (req,res)=>{
    const {id}=req.params;
    

    await listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted successfully !!")
    res.redirect("/listings");
}


module.exports.newListing=async (req,res)=>{
    let filename=req.file.filename;
    let url=req.file.path;

    let result= listingSchema.validate(req.body);
    const list=new listing(req.body.listing);
    list.owner=req.user._id;
    
    list.image={filename,url};
    //owner ki id jayegi ..then when we click show route..//id is populated with user details
    await list.save() //adding directly to the DB
    req.flash("success","New listing added successfully !!")//accepted in index.js by a MW and showed on index.ejs
    res.redirect("/listings");

}


module.exports.updateListing=async (req,res,next)=>{

        let {id}=req.params;
       let list= await listing.findByIdAndUpdate(id,{...req.body.listing});   // destructuring the coming object

        if(typeof req.file!="undefined"){
            //mtlb agr koi new file upload hoti hai to usko update krdo
            //agr nhi hoti to baaki cheeze update kro ..image chhodkr
            let filename=req.file.filename;
            let url=req.file.path;
            list.image={filename,url};
            await list.save();
        }
        req.flash("success","Listing updated successfully !!")
        res.redirect(`/listings/${id}`);//directly moving to the show route , because show route is also using path /listings/:id

}

module.exports.editListing=async (req,res,next)=>{

        let {id}=req.params;
 
    
        const listings=await listing.findById(id);

        let OriginalImageUrl=listings.image.url;
        OriginalImageUrl=OriginalImageUrl.replace("/upload","/upload/w_250");

        if(!listings){
            req.flash("error","Listing you are trying to edit does Not Exist");
            res.redirect("/listings");
        }else{
        res.render("listings/edit.ejs",{listings,OriginalImageUrl});
        }

}
