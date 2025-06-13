import { io } from "socket.io-client";

let socket = null;

export const connectSocket = () => {
  return new Promise((resolve, reject) => {
    if (!socket) {
      socket = io("https://job-interview-sm41.onrender.com", {
        transports: ["websocket", "polling"],
        timeout: 20000,
        reconnectionAttempts: 5,
      });

      socket.on("connect", () => {
        console.log("✅ Socket connected");
        resolve(socket);
      });

      socket.on("connect_error", (error) => {
        console.error("❌ Socket connection error:", error);
        reject(error);
      });

      socket.on("disconnect", () => {
        console.warn("⚠️ Socket disconnected");
      });
    } else if (socket.connected) {
      resolve(socket);
    } else {
      socket.once("connect", () => resolve(socket));
    }
  });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
