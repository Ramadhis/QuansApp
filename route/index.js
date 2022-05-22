import express from "express";
import jwt from "jsonwebtoken";
let router = express.Router();

router.get("/", (req, res) => {
  let nama = req.body;
  console.log(nama);
  //req.headers.authorization = "cek";
  let jwtsign = jwt.sign({ userId: "asd", name: "rama" }, "tessign");
  const authHeader = req.headers["authorization"];
  console.log("asd" + jwtsign + "tes");

  res.cookie("refreshToken", "123123123123", {
    httpOnly: true,
    maxAge: 10000,
    // secure: true, jika https
  });

  let verif = jwt.verify(jwtsign, "tessign", (err, decoded) => {
    if (err) {
      console.log("error");
    }

    console.log(decoded.name);
  });
  console.log(verif);
  console.log("Cookies: ", req.cookies.refreshToken);
  console.log("Signed Cookies: ", req.signedCookies);
  res.json(nama);
});

export default router;
