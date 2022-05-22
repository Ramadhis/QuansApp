import jwt from "jsonwebtoken";
//login checking
const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(req.headers);
  const split = authHeader && authHeader.split(" ")[1];
  if (split == null) {
    return res.status(400).json({ msg: "token kosong" });
  }

  jwt.verify(split, process.env.token, (err, decoded) => {
    if (err) {
      return res.status(400).json({ msg: "token tidak valid" });
    }
    console.log("auth oke");
  });
  next();
};

export default auth;
