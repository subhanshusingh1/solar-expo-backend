import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";

// Load Environment Variables
dotenv.config();

// Import Local Modules
import connectDB from "./config/db.js";

// App Initialization
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware
app.use(bodyParser.json());

const corsOptions = {
  origin: process.env.CLIENT_URL, // Change this to the actual frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// User Routes
app.use("/api/users", userRoutes);
// Use score routes
app.use("/api/score", scoreRoutes);

// Database Connection
const connectDatabase = async () => {
  try {
    await connectDB();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error(`Database connection failed: ${error.message}`);
    process.exit(1);
  }
};

// Start the Application (No need for app.listen in Vercel)
const startApp = async () => {
  try {
    await connectDatabase();
    console.log("App is initialized and ready.");
  } catch (error) {
    console.error(`Error initializing app: ${error.message}`);
    process.exit(1);
  }
};

// Start the App
startApp();

// Export the app for Vercel deployment
export default app;
