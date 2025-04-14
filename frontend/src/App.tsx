import { Routes, Route } from "react-router-dom";

import NotFound from "./components/404";

import Userroutes from "./routes/userroutes";
import AdminRoutes from "./routes/adminroutes";
import { useEffect } from "react";
import { socket } from "./configs/socket";

const App = () => {


  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect", () => {
      console.log("Connected to server! ID:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  
  return (
    <>
      <Routes> 
        

      
      <Route path="/*" element={<Userroutes />} />
      <Route path="/admin/*" element={<AdminRoutes/>} />

        
        <Route path="*" element={<NotFound/>} />

      </Routes>
    </>
  );
};

export default App;
