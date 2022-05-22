import express from "express";
import like_log from ".././model/like_logModel.js";
import quans from ".././model/quansModel.js";
import tag_quans from ".././model/tag_quansModel.js";
import tag from ".././model/tagModel.js";

let router = express.Router();

router.get("/", async (req, res) => {
  let a = await quans.findAll({
    include: [{ model: like_log }, { model: tag_quans, include: [{ model: tag }] }],
  });
  return res.json(a);
});

export default router;
