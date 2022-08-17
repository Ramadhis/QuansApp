import express from "express";
import tag from ".././model/tagModel.js";
import { Op, Sequelize } from "sequelize";
import Quans from "../model/quansModel.js";
import Tag_quans from "../model/tag_quansModel.js";
let router = express.Router();

router.post("/", async (req, res) => {
  let s = req.body.s.trim();
  let a = await tag.findAll({
    where: { [Op.or]: { name: { [Op.like]: `%${s}%` }, description: { [Op.like]: `%${s}%` } } },
    attributes: { include: [[Sequelize.literal(`(SELECT COUNT(*) FROM tag_quans where tag_quans.id_tags = tag.id)`), "tagQuansCount"]] },
  });
  return res.json(a);
});

router.get("/quansTag/", async (req, res) => {
  let s = req.query.idQuestion;
  try {
    let a = await Tag_quans.findAll({
      where: { id_quans: s },
      include: [{ model: tag, attributes: { exclude: ["createdAt", "updatedAt"] } }],
    });
    return res.json(a);
  } catch (error) {
    console.log(error);
    return res.status(404).json(error);
  }
});

export default router;
