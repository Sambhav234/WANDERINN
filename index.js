if(process.env.NODE_ENV!="production"){
    require('dotenv').config()
}




const express=require("express");
const app=express();
const mongoose=require("mongoose");
const ejsMate=require("ejs-mate");
const methodOverride=require("method-override");
const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
app.use(methodOverride("_method"));
const path=require("path");

const passport=require("passport");
const User=require("./models/user.js");
const LocalStrategy=require("passport-local");


app.use(express.urlencoded({extended :true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
const ExpressError=require("./utils/ExpressErrors.js");

const listingroute=require("./routes/listing.js");


const reviewroute=require("./routes/review.js");

const userRoute = require("./routes/user.js");


const dbUrl=process.env.ATLAS_DB;
console.log(dbUrl);

main()
.then(()=>{
   console.log("connection success");
})
 .catch((err) => console.log(err));

async function main() {

  await mongoose.connect(dbUrl);

  
}


const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
});

store.on("error",()=>{
console.log("ERROR IN MONGO SESSION STORE",err);
})

const sessionInfo={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }
}


app.listen(8080,()=>{
    console.log("server is running on port 8080");
})



app.use(session(sessionInfo));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.Msg=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})


// app.get("/demouser",async (req,res)=>{
//     let fakeuser=new User({
//         email:"Sam@127",
//         username:"sam124"
//     });

//      let RegUSer=await User.register(fakeuser,"Hello123") // register is the static function of passport-local-mongoose
//                                     //  (user,pass,callback) where pass is salted and hashed by mongoose auto.
//     res.send(RegUSer);
    
// })


app.use("/",userRoute); //for signup
app.use("/listings",listingroute);
app.use("/listings/:id/reviews",reviewroute);















app.use((req, res, next) => {                       //for unmatched routes , since above one is not working ..
    next(new ExpressError(404, "Page Not Found"));
});

app.use((err,req,res,next)=>{
    let {statuscode=500,message="Something went wrong !!"}=err;
    res.render("error.ejs",{message});
})




