import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import { errorHandler } from "./presentation/middlewares/error.middleware";
import userRoutes from "./presentation/routes/user/user.routes";
import adminRoutes from "./presentation/routes/admin/admin.routes";

dotenv.config();

const app = express();


// Middlewares
app.use(express.json());
app.use(cors());


// Test Route
app.get("/", (req, res) => {
  res.send("Post Service Running...");
});

app.use(process.env.API_USER_ROUTE as string, userRoutes)
app.use(process.env.API_ADMIN_ROUTE as string, adminRoutes)

app.use(errorHandler)

// Start Server
const startServer = async () => {

  await connectDB();

  const PORT = process.env.PORT || 5003;

  app.listen(PORT, () => {
    console.log(`Post Service running on  http://localhost:${PORT}`);
  });
};

startServer();