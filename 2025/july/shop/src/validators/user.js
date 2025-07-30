// validators/user.js
import * as yup from "yup";

export const userSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
  }),
});
