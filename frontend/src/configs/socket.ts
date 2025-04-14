// socket.ts
import { io } from "socket.io-client";

export const socket = io("http://localhost:3001", {
  transports: ["websocket"], // force websocket
  withCredentials: true, // only if backend has credentials: true
  path: "/ws",
});
