const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
require("dotenv").config();

const interviewRequestsRouter = require("./routes/interviewRequests");
const authRoutes = require("./routes/auth.routes");

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT"],
  },
});

// Middleware
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// Attach io to each request
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use("/api/interview-requests", interviewRequestsRouter);
app.use("/api", authRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Socket.io connection
io.on("connection", (socket) => {
  console.log("🔌 Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// MongoDB connection
const PORT = process.env.PORT || 8080;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/job-platform";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("🔻 Shutting down gracefully...");
  await mongoose.connection.close();
  server.close(() => {
    console.log("🔒 Server closed");
    process.exit(0);
  });
});
