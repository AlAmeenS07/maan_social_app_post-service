import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";

dotenv.config();

const app = express();


// Middlewares
app.use(express.json());
app.use(cors());


// Test Route
app.get("/", (req, res) => {
  res.send("Post Service Running...");
});


// Start Server
const startServer = async () => {

  await connectDB();

  const PORT = process.env.PORT || 5003;

  app.listen(PORT, () => {
    console.log(`Post Service running on  http://localhost:${PORT}`);
  });
};

startServer();