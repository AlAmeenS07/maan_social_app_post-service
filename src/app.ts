import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { errorHandler } from "./presentation/middlewares/error.middleware";
import userRoutes from "./presentation/routes/user/user.routes";
import adminRoutes from "./presentation/routes/admin/admin.routes";
import { consumer, producer } from "./config/kafka";
import { createPostsIndex } from "./infrastructure/elasticsearch/index/post.index";
import { startPostSyncConsumer } from "./infrastructure/kafka/consumer/post.sync.consumer";
import { metricsMiddleware } from "./presentation/middlewares/metrics.middleware";
import register from "./config/prom.client";
import { requestLogger } from "./presentation/middlewares/req.logger.middleware";

dotenv.config();

const app = express();


// Middlewares
app.use(express.json());

app.use(requestLogger)
app.use(metricsMiddleware)

// app.use(cors({
//   origin : "*",
//   credentials : true
// }));


// Test Route
app.get("/", (req, res) => {
  res.send("Post Service Running...");
});

app.use(process.env.API_USER_ROUTE as string, userRoutes)
app.use(process.env.API_ADMIN_ROUTE as string, adminRoutes)

app.get(process.env.API_METRICS_ROUTE as string, async (_req, res) => {
  res.set("Content-Type", register.contentType);

  res.end(await register.metrics());

});

app.use(errorHandler)

// Start Server
const startServer = async () => {

  await connectDB();
  // Kafka Producer
  await producer.connect();
  console.log("Kafka Producer Connected");

  // Kafka Consumer
  await consumer.connect();
  console.log("Kafka Consumer Started");

  // Elasticsearch Index
  await createPostsIndex();
  console.log("Posts Index Ready");

  await startPostSyncConsumer()
  console.log("Post Sync Consumer Started");

  const PORT = process.env.PORT || 5003;

  app.listen(PORT, () => {
    console.log(`Post Service running on  http://localhost:${PORT}`);
  });
};

startServer();