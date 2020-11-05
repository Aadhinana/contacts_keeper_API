const express = require("express");

const authMiddleware = require("../../middleware/authentication");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const Contact = require("../../models/contact");
const { update } = require("../../models/contact");

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
router.post(
  "/",
  authMiddleware,
  [body("name", "Name cannot be empty field").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }

    const newContact = {
      name: req.body.name,
      email: req.body.email || " ",
      phone: req.body.phone || " ",
      user: req.user,
    };
    try {
      const contact = new Contact(newContact);
      const result = await contact.save();

      return res.status(201).json({ contact: result });
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  }
);

/* 
/:id PUT
update a contact with the user ID
protected
*/
router.put("/:id", authMiddleware, async (req, res) => {
  // find the contact wiht the id
  try {
    const contactData = await Contact.findOne({ _id: req.params.id });

    if (!contactData) {
      return res.status(404).json({ message: `No such contact found!` });
    }

    //check if contact belongs to user
    if (contactData.user != req.user) {
      return res
        .status(401)
        .json({ message: "You are not Authorized to do this." });
    }

    const updatedContact = {
      name: req.body.name || contactData.name,
      email: req.body.email || contactData.email,
      phone: req.body.phone || contactData.phone,
    };

    const result = await Contact.updateOne(
      { _id: req.params.id },
      updatedContact
    );
    return res.status(200).json({ message: "Contact updated" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});

/* 
/:id DELETE
delete a contact with the user ID
protected
*/
router.delete("/:id", authMiddleware, async (req, res) => {
  // find the contact wiht the id
  try {
    const contactData = await Contact.findOne({ _id: req.params.id });

    if (!contactData) {
      return res.status(404).json({ message: `No such contact found!` });
    }

    //check if contact belongs to user
    if (contactData.user != req.user) {
      return res
        .status(401)
        .json({ message: "You are not Authorized to do this." });
    }

    const result = await Contact.deleteOne({ _id: req.params.id });
    return res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
