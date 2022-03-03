import express from "express";
import listEndpoints from "express-list-endpoints";

const server = express();
server.use(express.json());

import router from "./routes/index.js";
server.use(router);

console.table(listEndpoints(server));

import { catchAll } from "./errorHandlers.js";
server.use(catchAll);

export default server;
