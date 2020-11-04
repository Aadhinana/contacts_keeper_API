const express = require("express");

const router = express.Router();

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
router.post("/", (req, res) => {
  console.log("Authenticate a given user");
});

module.exports = router;
