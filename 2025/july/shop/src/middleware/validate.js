const { validationResult } = require("express-validator");

/**
 * Middleware to run express-validator checks and handle errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

/**
 * Higher-order middleware to validate request body using Yup schema
 */
const createYupValidator = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const formattedErrors = error.inner.reduce((acc, curr) => {
      acc[curr.path] = curr.message;
      return acc;
    }, {});
    return res.status(400).json({ errors: formattedErrors });
  }
};

const {
  registrationSchema,
  loginSchema,
  refreshTokenSchema,
} = require("../schemas/user.schema");

module.exports = {
  handleValidationErrors,
  validateRegistration: createYupValidator(registrationSchema),
  validateLogin: createYupValidator(loginSchema),
  validateRefreshToken: createYupValidator(refreshTokenSchema),
};
