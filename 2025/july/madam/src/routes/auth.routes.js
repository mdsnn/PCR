const express = require("express");
const validate = require("../middleware/validate.middleware");
const protect = require("../middleware/auth.middleware");
const {
  registerSchema,
  loginSchema,
  resetRequestSchema,
  resetConfirmSchema,
} = require("../validators/auth.schema");

const controller = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", validate(registerSchema), controller.register);
router.post("/login", validate(loginSchema), controller.login);
router.post("/refresh", controller.refresh);
router.post("/logout", protect, controller.logout);
router.post(
  "/reset/request",
  validate(resetRequestSchema),
  controller.resetRequest
);
router.post(
  "/reset/confirm",
  validate(resetConfirmSchema),
  controller.resetConfirm
);

module.exports = router;
