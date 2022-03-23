const express = require("express");
const app = express();
const dotenv = require("dotenv");
const colors = require("colors");
// const cors = require("cors");
const router = require("./routes/auth");

// env config
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 5000;
// connected with db
const connectedDB = require("./db/conn");
connectedDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
// app.use(cors());

// LISTEN APP
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
