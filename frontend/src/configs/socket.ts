// socket.ts
import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_API_SOCKET_URL, {
  transports: ["websocket"], // force websocket
  withCredentials: true, // only if backend has credentials: true
  path: "/ws",
});
