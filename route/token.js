import express from "express";

let router = express.Router();

router.get("/refreshToken", async (req, res) => {
  return res.json({ token: "AAAtes" });
});

export default router;
