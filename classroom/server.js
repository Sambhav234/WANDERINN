const express=require("express");
const app=express();
const session=require("express-session");
const flash=require("connect-flash");
const path=require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))
// const users=require("./classroom/user.js");
// const posts=require("./classroom/posts.js");
const Cookieparser=require("cookie-parser");
app.use(Cookieparser("secretcode"));

app.use(flash());

const sessionInfo={
    secret:"secretcode",
    resave:false,
    saveUninitialized:true,
}



app.use(session(sessionInfo));

app.get("/",(req,res)=>{
    res.send("everything working fine.....");
})


// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{

//         req.session.count=1;
//     }

//     res.send(`You have made ${req.session.count} requests`);

// })


// MW FOR FLASHING MSG
app.use((req,res,next)=>{
    res.locals.msg=req.flash("success");
    res.locals.errorMsg=req.flash("Error");
    next();
})

app.get("/register",(req,res)=>{
    let {name="anonymous"}=req.query;
    req.session.name=name;
    if(name=="anonymous"){
    
        req.flash("Error","User Not Registered");
    }else{
        req.flash("success","user registered successfully");
    }
    res.redirect("/hello");
})


app.get("/hello",(req,res)=>{
    let name=req.session.name;
   //res.locals.msg can also be used here
    res.render("data.ejs",{name});
})


app.listen(3000,()=>{
    console.log("listening on port : 3000");
})






