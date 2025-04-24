import { io } from "../app";



export const Socketconnection=()=>{


  
    io.on("connection", (socket) => {
        console.log("✅ New connection:", socket.id)
      
        socket.on("disconnect", () => {
          console.log("❌ Disconnected:", socket.id)
        })
      
        socket.on("task-created", (data) => {
          io.emit("task-reciver", data) // ✅ send to all clients
        })

        socket.on('remove-user',({userId,taskId})=>{
            io.emit('removed-user',{userId,taskId})
        })
        socket.on('userTaskcomplete',(data)=>{
          io.emit('task-updated-admin',data)
        })
      })

    }