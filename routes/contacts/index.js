const express = require("express");
const authentication = require("../../middleware/authentication");
const authMiddleware = require("../../middleware/authentication");

const router = express.Router();

/* 
/ GET 
Gets the contacts for the logged in user
protected 
*/
router.get("/", authMiddleware, (req, res) => {
  console.log("Gets contacts for the user");
});

/* 
/ POST 
Adds a contact for the logged in user
protected
*/
router.post("/", authMiddleware, (req, res) => {
  console.log("Adds a contact for the user");
});

/* 
/:id PUT
update a contact with the user ID
protected
*/
router.put("/:id", authMiddleware, (req, res) => {
  console.log("Updates a contact");
});

/* 
/:id DELETE
delete a contact with the user ID
protected
*/
router.delete("/:id", authMiddleware, (req, res) => {
  console.log("deletes a contact");
});

module.exports = router;
