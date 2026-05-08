const express = require("express");
const authController = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", (req, res, next) => {
  authController.register(req, res).catch(next);
});

router.post("/login", (req, res, next) => {
  authController.login(req, res).catch(next);
});

router.get("/me", authMiddleware, (req, res, next) => {
  authController.me(req, res).catch(next);
});

module.exports = router;
