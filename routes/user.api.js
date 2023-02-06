const express = require("express");
const router = express.Router();
const { createUser, getAllUsers, getUserById } = require("../controllers/user.controller");

const { body } = require("express-validator");
const validators = require("../middlewares/validators");

router.post(
  "/",
  validators.validate([
    body("name", "Invalid name").exists().notEmpty(),
    body("email", "Invalid email")
      .exists()
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false }),
    body("password", "Invalid password").exists().notEmpty(),
  ]),
  createUser
);

router.get("/", getAllUsers);


router.get('/:username', getUserById)

module.exports = router;
