const yup = require("yup");

const emailSchema = yup
  .string()
  .email("Invalid email format")
  .required("Email is required")
  .trim()
  .lowercase();

const passwordSchema = yup
  .string()
  .required("Password is required")
  .min(6, "Password must be at least 6 characters")
  .max(50, "Password too long");

const passwordConfirmationSchema = yup
  .string()
  .required("Password confirmation is required")
  .oneOf([yup.ref("password"), null], "Passwords must match");

// Registration schema
const registrationSchema = yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
  passwordConfirmation: passwordConfirmationSchema,
});

// Login schema
const loginSchema = yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});

// Refresh token schema
const refreshTokenSchema = yup.object().shape({
  refreshToken: yup.string().required("Refresh token is required"),
});

module.exports = {
  emailSchema,
  passwordSchema,
  passwordConfirmationSchema,
  registrationSchema,
  loginSchema,
  refreshTokenSchema,
};
