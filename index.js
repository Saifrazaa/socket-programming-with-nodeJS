var express=require("express");
var app=express();
var Server=require("http").createServer(app);
var io=require("socket.io")(Server);
var user=[];
app.use(express.static(__dirname+"/bower_components"));
app.get("/",function(req,res,next){
  res.sendFile(__dirname+"/server.html");
});
io.on('connection', function(socket) {
  user.push(socket);
  console.log(user.length+" Friends are Online");

  socket.on("send message" ,function(data){
    console.log(data);
    io.sockets.emit("new message",{msg:data});
    });
   })

Server.listen(3000);
