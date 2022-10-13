import express from "express";
import cookieParser from "cookie-parser";
import index from "./route/index.js";
import user from "./route/user.js";
import quans from "./route/quans.js";
import Tag from "./route/tag.js";
import Token from "./route/token.js";
import likeLog from "./route/likeLog.js";
import auth from "./middleware/auth.js";

import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());

app.use("/", index);
app.use("/user", user);
app.use("/quans", quans);
app.use("/tag", Tag);
app.use("/like", likeLog);
app.use("/token", Token);

app.listen(5000);
