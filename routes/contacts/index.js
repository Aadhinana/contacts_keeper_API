const express = require("express");

const authMiddleware = require("../../middleware/authentication");

const router = express.Router();

const Contact = require("../../models/contact");

/* 
/ GET 
Gets the contacts for the logged in user
protected 
*/
router.get("/", authMiddleware, async (req, res) => {
  // find all contacts for the logged in user
  try {
    const data = await Contact.find({ user: req.user }).sort({ createdAt: -1 });
    return res.status(200).json({ contacts: data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
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
