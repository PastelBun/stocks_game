import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import hbs, {engine} from "express-handlebars";
import adminRoutes from "./routes/adminRoutes";  // Correct import
import regularRoutes from "./routes/regularRoutes";
import automaticRoutes from "./routes/automaticRoutes";
import authRoutes from "./routes/authRoutes";
dotenv.config();

const app: Express = express();
app.use(express.urlencoded({ extended: true }));
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

app.engine("hbs", engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layout/'),
    runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
}));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Route that directly renders main.hbs
app.get("/", (req, res) => {
    res.render("index");
});

app.use(express.static("public"));
app.use("/admin", adminRoutes);
app.use("/regular", regularRoutes);
app.use("/automatic", automaticRoutes);
app.use("/auth",authRoutes);
 //needs to actually be automated
app.listen(3000, () => {
    console.log(`[server]: Server is running at http://localhost:3000`);
});
