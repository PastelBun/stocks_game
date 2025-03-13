import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import adminRoutes from "./routes/adminRoutes";  // Correct import
import regularRoutes from "./routes/regularRoutes";  // Ensure this import is added

dotenv.config();

const app: Express = express();
app.use(express.json());

const url = process.env.MONGOLAB_URI;
if (!url) {
    console.error("MongoDB connection string is missing! Check your .env file.");
    process.exit(1);
}

mongoose.connect(url)
    .then(() => console.log("Database Connected"))
    .catch((error) => console.error("MongoDB Connection Error:", error));

const database = mongoose.connection;
database.on("error", (error) => console.log("DB Error:", error));

app.use("/admin", adminRoutes);
app.use("/regular", regularRoutes);  // Corrected registration

app.listen(3000, () => {
    console.log(`[server]: Server is running at http://localhost:3000`);
});
