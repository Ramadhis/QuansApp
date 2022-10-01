import express from "express";
import like_log from ".././model/like_logModel.js";
import tag_quans from ".././model/tag_quansModel.js";
import tag from ".././model/tagModel.js";
import { Op, Sequelize } from "sequelize";
import quans from ".././model/quansModel.js";
import auth from ".././middleware/auth.js";
import Tag_quans from ".././model/tag_quansModel.js";

let router = express.Router();

router.get("/", async (req, res) => {
  let a = await quans.findAll({
    include: [{ model: like_log }, { model: tag_quans, include: [{ model: tag }] }],
    attributes: { include: [[Sequelize.literal(`(SELECT COUNT(*) FROM like_log where like_log.id_quans = quans.id)`), "like_count"]] },
  });
  return res.json(a);
});

router.post("/showquans/", async (req, res) => {
  let id = req.body.id;
  let idUser = req.body.idUser;
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
          [Sequelize.literal(`(SELECT COUNT(*) FROM like_log where (like_log.id_quans = quans.id) AND (like_log.id_user = ${idUser}))`), "likeCheck"],
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

router.post("/search/", async (req, res) => {
  let q = req.body.search;
  let order = req.body.order;
  let idUser = req.body.idUser;
  let a;
  let orderBy = [];
  if (order === "terbaru") {
    orderBy = ["id", "desc"];
  } else if (order === "sesuai") {
    orderBy = [Sequelize.literal("like_count"), "desc"];
  }

  try {
    a = await quans.findAll({
      where: { [Op.and]: { quans: { [Op.like]: `%${q}%` }, id_parent: { [Op.eq]: "0" } } },

      attributes: {
        include: [
          [Sequelize.literal(`(SELECT COUNT(*) FROM like_log where like_log.id_quans = quans.id)`), "like_count"],
          [Sequelize.literal(`(SELECT COUNT(*) FROM like_log where (like_log.id_quans = quans.id) AND (like_log.id_user = ${idUser}))`), "likeCheck"],
        ],
      },
      include: [{ model: tag_quans, include: [{ model: tag }] }],
      order: [orderBy],
    });
    return res.json(a);
  } catch (error) {
    return res.status(404).json({ msg: error });
  }
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
    return res.json(a);
  } catch (error) {
    return res.status(404).json({ msg: error });
  }
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
    return res.json(a);
  } catch (error) {
    return res.status(404).json({ msg: error });
  }
});

router.post("/myQuestion", async (req, res) => {
  let q = req.body.s.trim();
  let filter = req.body.filter;
  let idUser = req.body.idUser;
  let order = req.body.order;
  let orderBy = [];
  if (order === "terbaru") {
    orderBy = ["id", "desc"];
  } else if (order === "sesuai") {
    orderBy = [Sequelize.literal("like_count"), "desc"];
  }

  let a;
  try {
    a = await quans.findAll({
      where: { [Op.and]: { quans: { [Op.like]: `%${q}%` }, id_parent: { [Op.eq]: "0" }, id_user: { [Op.eq]: idUser } } },
      attributes: {
        include: [
          [Sequelize.literal(`(SELECT COUNT(*) FROM like_log where like_log.id_quans = quans.id)`), "like_count"],
          [Sequelize.literal(`(SELECT COUNT(*) FROM like_log where (like_log.id_quans = quans.id) AND (like_log.id_user = ${idUser}))`), "likeCheck"],
        ],
      },
      include: [{ model: tag_quans, include: [{ model: tag }] }],
      order: [orderBy],
    });
    return res.json(a);
  } catch (error) {
    return res.status(404).json({ msg: error });
  }
});

router.post("/addQuestion", async (req, res) => {
  let { question, id_user, tag } = req.body;
  let splitTag = tag.split(",");
  // return console.log(splitTag);
  try {
    const insert = await quans.create({ id_user: id_user, id_parent: "0", quans: question });
    let arrTag = [];
    for (let i = 0; i <= splitTag.length - 1; i++) {
      console.log("asdasdasd  " + i);
      arrTag.push({ id_quans: insert.id, id_tags: splitTag[i] });
    }
    if (arrTag.length !== 0) {
      await Tag_quans.bulkCreate(arrTag);
    }
    return res.json({ msg: "success", data: insert });
  } catch (error) {
    return res.status(404).json({ msg: error });
  }
});

router.delete("/deleteQuestion", async (req, res) => {
  try {
    let { id_user, id_quans } = req.body;
    const del = await quans.destroy({
      where: { id_parent: "0", id_user: id_user, id: id_quans },
    });
    await Tag_quans.destroy({
      where: { id_quans: id_quans },
    });
    return res.json({ msg: "success" });
  } catch (error) {
    return res.status(404).json({ msg: error });
  }
});

router.put("/editQuestion", async (req, res) => {
  try {
    let { id_user, id_quans, question, tag } = req.body;
    await quans
      .update(
        { quans: question },
        {
          where: {
            id_parent: "0",
            id_user: id_user,
            id: id_quans,
          },
        }
      )
      .then((result) => {
        return 1;
      })
      .catch((err) => {
        return res.status(404).json({ msg: "gagal" });
      });
    await Tag_quans.destroy({
      where: { id_quans: id_quans },
    });
    let splitTag = tag.split(",");
    let arrTag = [];

    if (splitTag.length !== 0) {
      for (let i = 0; i <= splitTag.length - 1; i++) {
        arrTag.push({ id_quans: id_quans, id_tags: splitTag[i] });
      }
      await Tag_quans.bulkCreate(arrTag);
    }

    return res.status(200).json({ msg: "success" });
  } catch (error) {
    return res.status(404).json({ msg: error });
  }
});

router.post("/myAnswer", async (req, res) => {
  try {
    let q = req.body.s.trim();
    let filter = req.body.filter;
    let idUser = req.body.idUser;
    let order = req.body.order;
    let orderBy = [];
    if (order === "terbaru") {
      orderBy = ["id", "desc"];
    } else if (order === "sesuai") {
      orderBy = [Sequelize.literal("like_count"), "desc"];
    }
    let a;
    a = await quans.findAll({
      where: { [Op.and]: { quans: { [Op.like]: `%${q}%` }, id_parent: { [Op.ne]: "0" }, id_user: { [Op.eq]: idUser } } },

      attributes: {
        include: [
          [Sequelize.literal(`(SELECT COUNT(*) FROM like_log where like_log.id_quans = quans.id)`), "like_count"],
          [Sequelize.literal(`(SELECT COUNT(*) FROM like_log where (like_log.id_quans = quans.id) AND (like_log.id_user = ${idUser}))`), "likeCheck"],
        ],
      },
      include: [{ model: tag_quans, include: [{ model: tag }] }],
      order: [orderBy],
    });
    return res.json(a);
  } catch (error) {
    return res.status(404).json({ msg: error });
  }
});

router.post("/addAnswer/", async (req, res) => {
  let { answer, id_parent, id_user } = req.body;
  try {
    const insert = await quans.create({ id_user: id_user, id_parent: id_parent, quans: answer });
  } catch (error) {
    return res.status(404).json({ msg: error });
  }
  return res.json({ msg: "success" });
});

router.delete("/deleteAnswer", async (req, res) => {
  try {
    console.log(req.cookies.token);
    let { id_quans } = req.body;
    const del = await quans.destroy({
      where: { id_parent: { [Op.ne]: "0" }, id: id_quans },
    });
    return res.status(200).json({ msg: "success" });
  } catch (error) {
    return res.status(404).json({ msg: error });
  }
});

router.put("/editAnswer", async (req, res) => {
  try {
    let { id_quans, answer } = req.body;
    await quans
      .update(
        { quans: answer },
        {
          where: {
            id_user: { [Op.ne]: "0" },
            id: id_quans,
          },
        }
      )
      .then((result) => {
        return res.json({ msg: "success" });
      })
      .catch((err) => {
        return res.status(404).json({ msg: "gagal" });
      });
  } catch (error) {
    return res.status(404).json({ msg: error });
  }
});

export default router;
