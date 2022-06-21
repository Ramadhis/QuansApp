import express from "express";
import like_log from ".././model/like_logModel.js";
import tag_quans from ".././model/tag_quansModel.js";
import tag from ".././model/tagModel.js";
import { Op, Sequelize } from "sequelize";
import quans from ".././model/quansModel.js";
let router = express.Router();

router.get("/", async (req, res) => {
  let a = await quans.findAll({
    include: [{ model: like_log }, { model: tag_quans, include: [{ model: tag }] }],
    attributes: { include: [[Sequelize.literal(`(SELECT COUNT(*) FROM like_log where like_log.id_quans = quans.id)`), "like_count"]] },
  });
  return res.json(a);
});

router.get("/showquans/", async (req, res) => {
  let id = req.query.id;
  if (id === "" || id === "null" || id === null) {
    return res.status(404).json({ msg: "data yang dicari tidak ada" });
  }
  let a = "";
  try {
    a = await quans.findAll({
      where: { [Op.or]: { [Op.and]: [{ id: id }, { id_parent: "0" }], id_parent: id } },
      // where: {},
      attributes: {
        include: [
          [Sequelize.literal(`(SELECT COUNT(*) FROM like_log where like_log.id_quans = quans.id)`), "like_count"],
          [Sequelize.literal(`(SELECT name FROM user where user.id = quans.id_user)`), "user_name"],
        ],
      },
      include: [{ model: tag_quans, include: [{ model: tag }] }],
    });
  } catch (error) {
    return res.status(404).json({ msg: error });
  }
  //{ model: like_log },
  return res.json(a);
});

router.get("/popular/", async (req, res) => {
  let a = "";
  try {
    a = await quans.findAll({
      limit: 10,
      order: [["id", "desc"]],
      attributes: { include: [[Sequelize.literal(`(SELECT COUNT(*) FROM like_log where like_log.id_quans = quans.id)`), "like_count"]] },
      include: [{ model: tag_quans, attributes: { exclude: ["createdAt", "updatedAt"] }, include: [{ model: tag, attributes: { exclude: ["createdAt", "updatedAt"] } }] }],
    });
  } catch (error) {
    return res.status(404).json({ msg: error });
  }
  return res.json(a);
});

router.get("/search/", async (req, res) => {
  let q = req.query.q;
  let filter = req.query.filter;
  let a = "";
  try {
    a = await quans.findAll({
      where: { quans: { [Op.like]: `%${q}%` } },
      order: [["id", "desc"]],
      attributes: { include: [[Sequelize.literal(`(SELECT COUNT(*) FROM like_log where like_log.id_quans = quans.id)`), "like_count"]] },
      include: [{ model: tag_quans, include: [{ model: tag }] }],
    });
  } catch (error) {
    return res.status(404).json({ msg: error });
  }
  return res.json(a);
});

router.get("/questionList/", async (req, res) => {
  let userid = req.query.userid;
  let a = "";
  try {
    a = await quans.findAll({
      order: [["id", "desc"]],
      where: { [Op.and]: [{ id_user: userid }, { id_parent: "0" }] },
      attributes: {
        include: [
          [Sequelize.literal(`(SELECT COUNT(*) FROM like_log where like_log.id_quans = quans.id)`), "like_count"],
          [Sequelize.literal("(SELECT COUNT(*) from quans q2 where q2.id_parent=quans.id)"), "countjawaban"],
        ],
      },
      include: [{ model: tag_quans, attributes: { exclude: ["createdAt", "updatedAt"] }, include: [{ model: tag, attributes: { exclude: ["createdAt", "updatedAt"] } }] }],
    });
  } catch (error) {
    return res.status(404).json({ msg: error });
  }
  return res.json(a);
});

router.get("/answerList/", async (req, res) => {
  let userid = req.query.userid;
  let a = "";
  try {
    a = await quans.findAll({
      order: [["id", "desc"]],
      where: { [Op.and]: { id_parent: { [Op.ne]: "0" }, id_user: { [Op.eq]: userid } } },
      attributes: {
        include: [[Sequelize.literal(`(SELECT COUNT(*) FROM like_log where like_log.id_quans = quans.id)`), "like_count"]],
      },
    });
  } catch (error) {
    return res.status(404).json({ msg: error });
  }
  return res.json(a);
});

router.post("/addAnswer/", async (req, res) => {
  let answer = req.body.answer;
  let id_parent = req.body.id_parent;
  let id_user = req.body.id_user;
  try {
    const insert = await quans.create({ id_user: id_user, id_parent: id_parent, quans: answer });
  } catch (error) {
    return res.status(404).json({ msg: error });
  }
  return res.json({ msg: "success" });
});

router.post("/addQuestion/", async (req, res) => {});

export default router;
