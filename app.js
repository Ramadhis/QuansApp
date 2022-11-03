import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import index from "./route/index.js";
import user from "./route/user.js";
import quans from "./route/quans.js";
import Tag from "./route/tag.js";
import Token from "./route/token.js";
import likeLog from "./route/likeLog.js";
import auth from "./middleware/auth.js";
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/user", user);
app.use("/quans", quans);
app.use("/tag", Tag);
app.use("/like", likeLog);
app.use("/token", Token);

app.listen(5000);
