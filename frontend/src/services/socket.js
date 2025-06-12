import { io } from "socket.io-client";

let socket = null;

export const connectSocket = () => {
  if (!socket) {
    socket = io("http://localhost:8080", {
      transports: ["websocket", "polling"],
      timeout: 20000,
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });
  }

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
