//MVC MODELS VIEWS CONTROLLERS
const User=require("../models/user");

module.exports.signup=async(req,res)=>{
    try{
    const {username,email,password}=req.body;
    const newUser=new User({username,email});
    const RegUser=await User.register(newUser,password);


    req.login(RegUser,(err)=>{
        if(err){
            return next(err);
        }
    req.flash("success",`Welcome to WanderINN ${username}`);
    res.redirect("/listings");
    })
    
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
    
}



module.exports.login=async (req,res)=>{
    let {username}=req.body;
    let redi=res.locals.redirectUrl || "/listings";
    //mtlb agar add new listing pr click krke login kr(if not logged in) rhe ho to req.locals.redirectUrl
    //wale path pr jao or agar login btn se kr rhe ho to listings pr jao;
    delete req.session.redirectUrl;
    req.flash("success",`Welcome back to WanderInn ${username}`);
    res.redirect(redi);
}


module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Logged Out Successfully");
        res.redirect("/listings");

    })
}