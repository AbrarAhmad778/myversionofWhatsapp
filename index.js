
const express = require("express");

const path = require("path");

const  methodOverride = require('method-override');


const app = express();

app.use(methodOverride("_method"));

let port = 9090;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));

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



app.get("/",(req,res)=>{
    res.send("Loudey k ball");
})

app.get("/chats",async (req,res)=>{
   let data =  await Chat.find();
//    console.log(data);
   res.render("index.ejs",{data});
})

app.get("/new",(req,res)=>{
    res.render("form.ejs");
})

app.post("/chats",(req,res)=>{
   let {from,msg,to} = req.body;
   let newChat = new Chat({
    from:from,
    msg:msg,
    to:to,
    date:new Date()
   })
   newChat
   .save()
   .then((res)=>{
    console.log("data has been saved in the Db",res);
   })
   .catch((err)=>{
    console.log("some error occurred",err);
   })
   res.redirect("/chats");
})

app.get("/chats/:id/edit",async (req,res)=>{

   let {id} = req.params;
    let chatId = await Chat.findById(id);
    res.render("edit.ejs",{chatId});

})

app.put("/chats/:id", async (req,res)=>{
    let {id} = req.params;
    let {msg: newMsg} = req.body;
    let chatId = await Chat.findByIdAndUpdate(id,

        {msg:newMsg},

        {runValidators:true,new:true});
    console.log(chatId);
    res.redirect("/chats");

});

app.delete("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let deletedChats = await Chat.findByIdAndDelete(id);
    console.log(deletedChats);
    res.redirect("/chats");
    
})

app.listen(port,()=>{
    console.log("server is listening at port",port);
})
