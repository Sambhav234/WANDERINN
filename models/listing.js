const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./reviews.js");

const ListingSchema = new Schema({
    title :{
        type : String,
        required: true
    },
    description :{
        type : String
    },
    image :{
        filename:String,
        url:String, 
    },
    price : {
        type : Number,
        required : true
    },
    location :{
        type : String,
        required : true
    },
    country :{
        type : String
    },
    reviews:[{
        type: Schema.Types.ObjectId,
        ref:"Review",
    }],
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User",
    }

});


ListingSchema.post("findOneAndDelete",async (listing)=>{
    if(listing){
        await Review.deleteMany({_id :{$in : listing.reviews}});
    }
})


const listing= mongoose.model("listing",ListingSchema);

module.exports=listing;