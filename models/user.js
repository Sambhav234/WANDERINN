const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose");

const UserSchema=new Schema({
    email:{
        type:String,
        required:true,
    },
        profileImage: {
        url: { type: String, default: '/uploads/user.png' },
        filename: String
    }
})

UserSchema.plugin(passportLocalMongoose);

// It automatically adds these fields to your schema:
// | Field      | Purpose                                   |
// | ---------- | ----------------------------------------- |
// | `username` | Required by Passport for login            |
// | `hash`     | Stores password hash (from `setPassword`) |
// | `salt`     | Stores unique salt for each password      |


module.exports = mongoose.model('User', UserSchema);