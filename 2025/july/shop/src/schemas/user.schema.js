const yup = require("yup");

const signupSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const refreshTokenSchema = yup.object({
  refreshToken: yup.string().required("Refresh token is required"),
});

module.exports = {
  signupSchema,
  loginSchema,
  refreshTokenSchema,
};
