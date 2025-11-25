import express from "express";
import cors from "cors";
import dotenv from "dotenv";
//import { PrismaClient } from "./generated/prisma/client.js";

dotenv.config();

const app = express();
//const prisma = new PrismaClient();
//const secret = process.env.JWT_SECRET;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.get("/", (_, res) => {
  res.send("Hello!");
});

app.listen(8000, () => {
  console.log("Listening on port 8000...");
});
