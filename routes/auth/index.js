const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { compare } = require("bcryptjs");
const User = require("../../models/user");

/* 
/ GET 
Gets the logged in user details 
protected 
*/
router.get("/", (req, res) => {
  console.log("Get the logged in user");
});

/* 
/ POST 
authenticate a given user and send back token 
public
*/
router.post(
  "/",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a password").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }
    const { email, password } = req.body;
    // check if user exists
    User.findOne({ email: email })
      .then(async (data) => {
        if (data) {
          // if user exist check for the password
          const isMatch = await compare(password, data.password);
          if (isMatch) {
            // password match - return JWT
            jwt.sign(
              { id: data._id },
              process.env.SECRET,
              { expiresIn: "1h" },
              (error, token) => {
                if (error) {
                  console.log(error);
                  return res.status(500).json({ message: "Server Error" });
                }
                return res.json({ token });
              }
            );
          } else {
            return res.json({
              message: "Invalid Credentiatls",
            });
          }
        } else {
          return res.json({
            message: "Email is not registered. Please register first.",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: "Server Error" });
      });
  }
);

module.exports = router;
