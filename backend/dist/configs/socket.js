"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Socketconnection = void 0;
const app_1 = require("../app");
const Socketconnection = () => {
    app_1.io.on("connection", (socket) => {
        console.log("✅ New connection:", socket.id);
        socket.on("disconnect", () => {
            console.log("❌ Disconnected:", socket.id);
        });
        socket.on("task-created", (data) => {
            app_1.io.emit("task-reciver", data); // ✅ send to all clients
        });
        socket.on('remove-user', ({ userId, taskId }) => {
            app_1.io.emit('removed-user', { userId, taskId });
        });
    });
};
exports.Socketconnection = Socketconnection;
