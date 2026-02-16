import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { connect } from "./config/db";
import http from "http";
import { initServer } from './config/socket'
const server = http.createServer(app);
initServer(server);
const startServer = () => {
  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server is running on port ${port} with socket io enabled`);
  });

  connect();
};

startServer();
