import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { authSocketUser } from "../middleware/socket.middleware";
let io: Server;

const loginSocketUser = () => {
  const io = getIO()
  io.on("connection", (socket) => {
    const userId = socket.data.userId
    socket.join(userId)
    console.log("New connection");

    io.on("disconnect" , () => {
      console.log("Disconnected");
    });
  });
}
export const initServer = (server: HttpServer) => {
  io = new Server(server, {
    cors: { origin: "*" },
  });
    io.use(authSocketUser)
  loginSocketUser()
  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
