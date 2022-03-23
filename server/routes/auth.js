const express = require("express");
const router = express.Router();
const {
  getUser,
  createPost,
  individualData,
  updateData,
  deleteUser,
} = require("../controllers/crud.controller");

router.get("/getuser", getUser);
router.post("/register", createPost);
router.get("/individual/:id", individualData);
router.patch("/update/:id", updateData);
router.delete("/deleteuser/:id", deleteUser);

// export
module.exports = router;
