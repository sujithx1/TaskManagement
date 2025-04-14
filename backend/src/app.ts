import express,{NextFunction, Request,Response} from "express";

import cookieParser from "cookie-parser";

import cors from "cors";
import userrouter from "./interfaces/routes/userRoutes";
import { errorHandler } from "./interfaces/middlewares/errorhandler";
import { connectDB } from "./configs/dbconnection";
import http from "http";
import adminrouter from "./interfaces/routes/adminRoutes";
import morgan from "morgan";
import { Server } from "socket.io";
import { Socketconnection } from "./configs/socket";


const app=express()
const server = http.createServer(app);
 

const corsOptions = {
  origin: process.env.CLIENT_URL, // Your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true, // Required for cookies/auth
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

const io = new Server(server, {
  cors: corsOptions,
  path: "/ws", // Must match frontend
});


export{io}

Socketconnection()

connectDB()
app.use(express.json()) 
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'))
app.use('/api/user',userrouter)
app.use('/api/admin',adminrouter)
app.use((err: Error, req: Request, res: Response, next: NextFunction) =>
  {
    
    errorHandler(err, req, res, next)
  }  
);  



// io.on("connection", (socket) => {
//   console.log("✅ Socket connected:", socket.id);

//   socket.on("disconnect", () => {
//     console.log("❌ Socket disconnected:", socket.id);
//   });
// });
 
export default server