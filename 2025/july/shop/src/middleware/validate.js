const { validationResult } = require("express-validator");
const {
  registrationSchema,
  loginSchema,
  refreshTokenSchema,
} = require("../schemas/user.schema");

// Generic validation middleware
const validate = (schema) => async (req, res, next) => {
  try {
    // Validate request body against schema
    await schema.validate(req.body, { abortEarly: false });

    // Proceed to next middleware if validation passes
    next();
  } catch (error) {
    // Format Yup validation errors
    const errors = error.inner.reduce((acc, curr) => {
      acc[curr.path] = curr.message;
      return acc;
    }, {});

    return res.status(400).json({ errors });
  }
};

// Express-validator result handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Specific validation middlewares
const validateRegistration = validate(registrationSchema);
const validateLogin = validate(loginSchema);
const validateRefreshToken = validate(refreshTokenSchema);

module.exports = {
  validate,
  handleValidationErrors,
  validateRegistration,
  validateLogin,
  validateRefreshToken,
};
