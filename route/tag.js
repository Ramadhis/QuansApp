import express from "express";
import tag from ".././model/tagModel.js";
import { Op, Sequelize } from "sequelize";
import Quans from "../model/quansModel.js";
let router = express.Router();

router.post("/", async (req, res) => {
  let s = req.body.s.trim();
  let a = await tag.findAll({
    where: { [Op.or]: { name: { [Op.like]: `%${s}%` }, description: { [Op.like]: `%${s}%` } } },
    attributes: { include: [[Sequelize.literal(`(SELECT COUNT(*) FROM tag_quans where tag_quans.id_tags = tag.id)`), "tagQuansCount"]] },
  });
  return res.json(a);
});

export default router;
