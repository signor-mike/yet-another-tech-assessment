import express from "express";
const router = express.Router();
router.use(express.json());

import transactionRouter from "./transactions/index.js";

router.use("/api", transactionRouter);

export default router;
