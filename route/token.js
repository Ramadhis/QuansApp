import express from "express";
import Users from ".././model/userModel.js";
import jwt from "jsonwebtoken";

let router = express.Router();

router.get("/refreshToken", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    console.log("ini token :" + refreshToken);
    if (!refreshToken) {
      return res.status(401).json({ msg: "refresh token kosong" });
    }
    let find = await Users.findAll({
      where: {
        refreshtoken: refreshToken,
      },
    });

    if (!find) {
      return res.status(403).json({ msg: "users tidak ditemukan" });
    }

    jwt.sign(refreshToken, process.env.refreshToken, (err, decode) => {
      if (err) {
        return res.status(403).json({ msg: err });
      }
    });

    let token = jwt.sign({ iduser: find[0].id, name: find[0].name, email: find[0].email }, process.env.token, { expiresIn: "15s" });
    return res.json({ token: token });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

export default router;
