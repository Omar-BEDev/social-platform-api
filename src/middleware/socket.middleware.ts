import { Socket } from "socket.io";
import { ApiError } from "../utils/ApiError";
import  jwt  from "jsonwebtoken";


export const authSocketUser  = (socket: Socket,next : (err?: Error) => void) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      throw new ApiError("Token not provided", 401)
    }

    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as any

    if (!decode) {
      throw new ApiError("Invalid token", 401)
    }
    socket.data.userId = decode.id
    next()
  }