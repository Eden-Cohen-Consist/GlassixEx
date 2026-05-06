import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { envConf } from "./utils/envConf";
import health from "./routes/health";
import tickets from "./routes/tickets";
import errorMiddleware from "./middleware/errorMiddleware";
import { rateLimiter } from "./middleware/rateLimitMiddleware";

const app = express();

app.use(express.json());
app.use(rateLimiter); // rate limiting for all endpoints

app.use("/", health);
app.use("/tickets", tickets);

app.use(errorMiddleware); /// error middleware

app.listen(envConf.port, () => console.log("Server Running ya Malshin"));
