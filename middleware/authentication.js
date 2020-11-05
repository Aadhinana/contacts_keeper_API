const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No Token. No Authorization" });
  }
  try {
    //   check for token and put user Id in req.user
    const decoded = await jwt.verify(token, process.env.SECRET);
    req.user = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid token" });
  }
};
