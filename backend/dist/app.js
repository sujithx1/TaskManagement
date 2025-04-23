"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./interfaces/routes/userRoutes"));
const errorhandler_1 = require("./interfaces/middlewares/errorhandler");
const dbconnection_1 = require("./configs/dbconnection");
const http_1 = __importDefault(require("http"));
const adminRoutes_1 = __importDefault(require("./interfaces/routes/adminRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const socket_io_1 = require("socket.io");
const socket_1 = require("./configs/socket");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const corsOptions = {
    origin: process.env.CLIENT_URL, // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true, // Required for cookies/auth
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use((0, cors_1.default)(corsOptions));
const io = new socket_io_1.Server(server, {
    cors: corsOptions,
    path: "/ws", // Must match frontend
});
exports.io = io;
(0, socket_1.Socketconnection)();
(0, dbconnection_1.connectDB)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)('dev'));
app.use('/api/user', userRoutes_1.default);
app.use('/api/admin', adminRoutes_1.default);
app.use((err, req, res, next) => {
    (0, errorhandler_1.errorHandler)(err, req, res, next);
});
// io.on("connection", (socket) => {
//   console.log("✅ Socket connected:", socket.id);
//   socket.on("disconnect", () => {
//     console.log("❌ Socket disconnected:", socket.id);
//   });
// });
exports.default = server;
