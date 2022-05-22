import express from "express";
import cookiepar from "cookie-parser";
import index from "./route/index.js";
import user from "./route/user.js";
import quans from "./route/quans.js";
import auth from "./middleware/auth.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cookiepar());
app.use(express.json());

app.use("/", index);
app.use("/user", user);
app.use("/quans", quans);

app.listen(5000);
