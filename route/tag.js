import express from "express";
import tag from ".././model/tagModel.js";
let router = express.Router();

router.get("/", async (req, res) => {
  let a = await tag.findAll();
  return res.json(a);
});

export default router;
