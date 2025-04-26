const mongoose=require("mongoose");
const listings=require("../models/listing.js")

const initdata=require("./data.js");
const mongoURL="mongodb://127.0.0.1:27017/WanderInn"

main()
.then(()=>{
   console.log("connection success");
})
 .catch((err) => console.log(err));

async function main() {

  await mongoose.connect(mongoURL);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


const initDB=async ()=>{
    await listings.deleteMany({});
   initdata.data=initdata.data.map((obj)=>({...obj,owner:"67fe75d9d35ed1a919fc2ca2"}))
   //inserting owner in every listing created
   await listings.insertMany(initdata.data);
    console.log("data was initialised..");

};

initDB();
