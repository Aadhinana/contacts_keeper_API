const express = require("express");

const router = express.Router();

/* 
/ POST 
register a user for the app
public
*/
router.post("/", (req, res) => {
  console.log("Register a user");
});

module.exports = router;
