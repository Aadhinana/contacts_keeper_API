require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT | 3000;

// Set up routes
app.use("/auth", require("./routes/auth"));
app.use("/contacts", require("./routes/contacts"));
app.use("/user", require("./routes/user"));

// 404
app.use((req, res) =>
  res.json({ message: "This API endpoint does not exist." })
);

// connect to DB - mongoAtlas
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => {
    // connected to DB. start listening to app.
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch((err) => {
    console.log("DB Connection error");
    process.exit(1);
  });
