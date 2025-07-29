const { validationResult } = require("express-validator");
const {
  registrationSchema,
  loginSchema,
  refreshTokenSchema,
} = require("../schemas/user.schema");

// Express-validator result handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Generic Yup validation middleware
const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errors = error.inner.reduce((acc, curr) => {
      acc[curr.path] = curr.message;
      return acc;
    }, {});
    res.status(400).json({ errors });
  }
};

module.exports = {
  validate,
  handleValidationErrors,
  validateRegistration: validate(registrationSchema),
  validateLogin: validate(loginSchema),
  validateRefreshToken: validate(refreshTokenSchema),
};
