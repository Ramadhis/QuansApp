import jwt from "jsonwebtoken";
//login checking
const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("Authorization : " + authHeader);
  const split = authHeader && authHeader.split(" ")[1];
  if (!split) {
    return res.status(400).json({ msg: "token kosong" });
  }

  jwt.verify(split, process.env.token, (err, decoded) => {
    if (err) {
      return res.status(400).json({ msg: "token tidak valid" });
    }
    console.log("auth Success");
  });
  next();
};

export default auth;
