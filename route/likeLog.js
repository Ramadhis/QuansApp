import express from "express";
import likeLog from "../model/like_logModel.js";
let router = express.Router();

router.get("/", async (req, res) => {
  let a = await likeLog.findAll();
  return res.json(a);
});

router.post("/add", async (req, res) => {
  try {
    let { id_user, id_quans } = req.body;
    const insert = await likeLog.create({ id_user: id_user, id_quans: id_quans });
    return res.status(200).json({ msg: "success" });
  } catch (error) {
    return res.status(404).json({ msg: error });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    let { id_user, id_quans } = req.body;
    const insert = await likeLog.destroy({
      where: { id_user: id_user, id_quans: id_quans },
    });
    return res.status(200).json({ msg: "success" });
  } catch (error) {
    return res.status(404).json({ msg: error });
  }
});

export default router;
