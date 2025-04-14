import dotenv from "dotenv"
dotenv.config()
import server from "./app";
// import { app } from "./app";

 


const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));

 