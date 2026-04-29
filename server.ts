import express from "express";
import dotenv from "dotenv";
dotenv.config();

import auth from "./routes/auth";
import health from "./routes/health";
import tickets from "./routes/tickets"

const app = express();

// ISSUE: No centralized security middleware (e.g. rate limiting, security headers, etc.).
// This leaves defaults open and makes abuse protection harder.
app.use(express.json());

app.use("/auth", auth);
app.use("/", health);
app.use("/tickets", tickets)


// ISSUE: Port is hardcoded, how would you deploy this to a different environment? what if port 3000 is already in use?
// Prefer process.env.PORT with a safe default.
app.listen(3000, () => console.log("Server Running ya Malshin"));

