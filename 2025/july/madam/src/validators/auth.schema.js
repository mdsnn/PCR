const Yup = require("yup");

exports.registerSchema = Yup.object({
  username: Yup.string().min(3).required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
});

exports.loginSchema = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

exports.resetRequestSchema = Yup.object({
  email: Yup.string().email().required(),
});

exports.resetConfirmSchema = Yup.object({
  token: Yup.string().required(),
  password: Yup.string().min(6).required(),
});
