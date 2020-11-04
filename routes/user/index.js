const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const { genSalt, hash } = require("bcryptjs");
/* 
/ POST 
register a user for the app
public
*/
router.post(
  "/",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password has to be more than 5 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }

    // No errros in body - continue with creation of user.
    const { email, password } = req.body;

    // check if the user already exists?
    const user = await User.findOne({ email: email });

    // hash the password
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    if (!user) {
      // user does not exist. then create
      const user = new User({
        email,
        password: hashedPassword,
      });
      user
        .save()
        .then((result) => {
          //   take result._id and generate a JWT.
          jwt.sign(
            { id: result._id },
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
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ message: "Server Error" });
        });
    } else {
      res.status(400).json({ message: "User already exist" });
    }
  }
);

module.exports = router;
