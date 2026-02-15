import { Server } from "socket.io";
import { Server as HttpServer } from "http";

let io: Server;

export const initServer = (server: HttpServer) => {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("New connection");
  });
  io.on("disconnect", (socket) => {
    console.log("Disconnected");
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
