
const mongoose = require("mongoose");

const Chat = require("./models/chat.js");

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

main()
.then(()=>{
    console.log("Mongodb server is connected to java script");
})
.catch((err)=>{
    console.log(err);
})

let chats = [
   {
    from:"Sohail",
    to:"Abrar",
    msg:"Lkb wru man?",
    date:new Date()
   },

   {
    from:"Abrar",
    to:"Sohail",
    msg:"Iam at canteen",
    date:new Date()
   },

   {
    from:"Sohail",
    to:"Abrar",
    msg:"both harsha and you come here immeadiately wt bitch is calling tou both",
    date:new Date()
   },

   {
    from:"Harsha",
    to:"Sohail",
    msg:"tell that bitch that we are coming",
    date:new Date()
   }
];

Chat.insertMany(chats);

Chat.updateMany({msg:"both harsha and you come here immeadiately wt bitch is calling tou both"},{msg:"both harsha and you come here immeadiately wt bitch is calling two both"})

.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
})


