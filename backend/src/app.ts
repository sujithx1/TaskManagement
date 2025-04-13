import express,{NextFunction, Request,Response} from "express";

import cookieParser from "cookie-parser";

import cors from "cors";
import userrouter from "./interfaces/routes/userRoutes";
import { errorHandler } from "./interfaces/middlewares/errorhandler";
import { connectDB } from "./configs/dbconnection";
import http from "http";
import { Server } from "socket.io";
import adminrouter from "./interfaces/routes/adminRoutes";
import morgan from "morgan";

connectDB()

const app=express()
const server = http.createServer(app);

const corsOptions = {
  origin:process.env.CLEINT_URL,
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
export const io = new Server(server, {
  cors: corsOptions,
});

app.use(cors(corsOptions))
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
  
 
export {app}