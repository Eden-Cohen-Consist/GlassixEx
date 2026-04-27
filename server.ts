import express from "express";
import dotenv from "dotenv";
dotenv.config();

import auth from "./routes/auth";
import health from "./routes/health";
import tickets from "./routes/tickets"

const app = express();

app.use(express.json());

app.use("/auth", auth);
app.use("/", health);
app.use("/tickets", tickets)


app.listen(3000, () => console.log("Server Running ya Malshin"));

