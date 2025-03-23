import { Router } from "express";
import chartController from "../controllers/chartController";
import changeController from "../controllers/changeController";

//these need to be automated, so they trigger after every set time
const router: Router=Router();

const API_BASE_URL = "http://localhost:3000/automatic"; // Make sure this matches your actual server

// Automatically update stock prices every 5 seconds
setInterval(async () => {
    try {
        console.log("Updating prices...");
        const response = await fetch(`${API_BASE_URL}/price`, { method: "PUT" });
        const data = await response.json();
        console.log(data.message);
    } catch (error) {
        console.error("Error updating prices:", error);
    }
}, 5000);

// Automatically update stock amounts every 3 seconds
setInterval(async () => {
    try {
        console.log("Updating amounts...");
        const response = await fetch(`${API_BASE_URL}/amount`, { method: "PUT" });
        const data = await response.json();
        console.log(data.message);
    } catch (error) {
        console.error("Error updating amounts:", error);
    }
}, 3000);

// Automatically log chart data every 5 seconds
setInterval(async () => {
    try {
        console.log("Logging chart data...");
        const response = await fetch(`${API_BASE_URL}/chart`, { method: "POST" });
        const data = await response.json();
        console.log(data.message);
    } catch (error) {
        console.error("Error logging chart data:", error);
    }
}, 5000);
export default router;