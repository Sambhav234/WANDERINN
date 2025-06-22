const joi=require('joi');  //kyuki jb hm hopscoth se request bhejte the /listings pr new listing bnane ke liye, to
//usme validation fail hojata tha, yani ki agr koi field empty hoti thi to wo empty hi create ho jati thi
//isliye schema validation is important


module.exports.listingSchema=joi.object({

    listing : joi.object({
        title:joi.string().required(),
        description:joi.string().required(),
        price:joi.number().required().min(0),
        image:joi.string().allow("",null),
        country:joi.string().required(),
        location:joi.string().required(),
        category: joi.string().required() // ✅ Make sure this line is present
    }).required(),

});

module.exports.reviewSchema=joi.object({

    Review : joi.object({
        rating:joi.number().required().min(1).max(5),
        comment:joi.string().required()
    }).required(),

});