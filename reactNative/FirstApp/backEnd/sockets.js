const MessageModel = require("./models/message");

const UserModel = require("./models/users");

module.exports = function(io){
    
    io.on('connection', async(socket)=>{
      socket.on("charge-message", async()=>{
        
        const message = await MessageModel.find();
        var Mes = [];
        var i =0;
        for (let i = 0; i < message.length; i++) {
          const User = await UserModel.findById(message[i].User);
          Mes[i] = {Name: User.Firstname +" "+ User.Lastname, Msg: message[i].Msg, Email: User.Email};
          
        }
        console.log(Mes.length);
        io.emit("message", Mes);
      })

      socket.on("message", async (msg, Email)=>{

        const User = await UserModel.findOne({Email:Email});
        await MessageModel.create({User: User._id, Msg: msg});
        

        let Mes = [{Name: User.Firstname +" "+ User.Lastname, Msg: msg, Email: User.Email}] 
        io.emit("message", Mes);
      })
      socket.on('disconnect', async ()=>{
        console.log('user disconnected');
      });
    })  
}